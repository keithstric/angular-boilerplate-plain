import 'reflect-metadata';
import {
	internalMetadataKey,
	modelKeyMetadataKey,
	rawKeyMetadataKey,
	Serial,
	SerializationOptions,
	serialMetadataKey
} from './serializers/serial';
import {Serializable} from './decorators/serial.decorator';

export type RecursivePartial<T> = {
	[P in keyof T]?:
	T[P] extends (infer U)[] ? RecursivePartial<U>[] :
		T[P] extends object ? RecursivePartial<T[P]> :
			T[P];
};

export interface Identifiable {
	key: string;
}

type Override<T, R> = Pick<T, Exclude<keyof T, keyof R>> & R;
type RawFromMapping<T extends Mapping<any>> = T extends Mapping<infer Raw> ? Raw : never;
// tslint:disable-next-line:no-shadowed-variable
type RawFromModel<T extends Model<any>> = T extends Model<infer Mapping> ? RawFromMapping<Mapping> : never;

export type Model<T extends Mapping<any>, Raw = RawFromMapping<T>> = Override<Raw, T>;

export interface ModelConstructor<T extends Model<any>, Raw = RawFromModel<T>> extends Serial<Raw, T> {
	new(model?: Partial<T>): T;
}

// tslint:disable-next-line:no-shadowed-variable
export function createModel<T>(Mapping: ModelConstructor<any>): ModelConstructor<T> {
	Mapping.serialize = Mapping.serialize.bind(Mapping);
	Mapping.deserialize = Mapping.deserialize.bind(Mapping);
	return Mapping as any as ModelConstructor<T>;
}

export abstract class Mapping<Raw> {
	static serialize<MappingConstructor extends new(model?: any) => any,
		// tslint:disable-next-line:no-shadowed-variable
		Mapping extends InstanceType<MappingConstructor>,
		Raw extends RawFromMapping<Mapping>>(this: MappingConstructor, model?: Model<Mapping>, options?: SerializationOptions): Raw {
		if (model === undefined) {
			return undefined;
		}
		if (model === null) {
			return null;
		}
		return model.toJSON(undefined, options);
	}

	static deserialize<MappingConstructor extends new(model?: any) => any,
		// tslint:disable-next-line:no-shadowed-variable
		Mapping extends InstanceType<MappingConstructor>,
		Raw extends RawFromMapping<Mapping>>(this: MappingConstructor, raw?: Raw): Mapping {
		if (raw === undefined) {
			return undefined;
		}
		if (raw === null) {
			return null;
		}
		return new this().applyRaw(raw);
	}

	constructor(model?: any) {
		this.apply(model as this);
	}

	apply(model?: Partial<this>): this {
		Object.assign(this, model);
		return this;
	}

	/**
	 * Update the model's properties from the raw JSON object's properties
	 * @param raw {Raw}
	 * @returns {Mapping}
	 */
	applyRaw(raw?: Partial<Raw>): this {
		if (!raw) {
			return this;
		}
		const model: any = {};
		const keys = Object.keys(raw) as (keyof Raw)[];
		for (const key of keys) {
			const value = raw[key];
			const modelKey: string | undefined = Reflect.getMetadata(modelKeyMetadataKey, this, key as string) || key;
			const serial: Serializable | undefined = Reflect.getMetadata(serialMetadataKey, this, modelKey);
			if (serial) {
				if (Array.isArray(serial)) {
					if (Array.isArray(value)) {
						model[modelKey] = value.map(v => serial[0].deserialize(v));
					}
				} else {
					model[modelKey] = serial.deserialize(value);
				}
			} else {
				model[modelKey] = value;
			}
		}
		return this.apply(model);
	}

	// even though we are not using `parentKey`, it's there for a placeholder as the first param of `toJSON` is being used by Node.js
	toJSON(parentKey?: string, options?: SerializationOptions): Raw {
		const raw: any = {};
		const keys = Object.keys(this) as (keyof this)[];
		const internalKeys = Reflect.getMetadata(internalMetadataKey, this) || [];
		for (const key of keys) {
			if (!(options && options.internals) && internalKeys.includes(key)) {
				continue;
			}
			const value = this[key];
			const rawKey: string | undefined = Reflect.getMetadata(rawKeyMetadataKey, this, key as string) || key;
			const serial: Serializable | undefined = Reflect.getMetadata(serialMetadataKey, this, key as string);
			if (serial) {
				if (Array.isArray(serial)) {
					if (Array.isArray(value)) {
						raw[rawKey] = value.map(v => serial[0].serialize(v, options));
					}
				} else {
					raw[rawKey] = serial.serialize(value, options);
				}
			} else {
				raw[rawKey] = value;
			}
		}
		return raw as Raw;
	}

	// serialize + stringify + parse + deserialize = deep clone
	clone(options: SerializationOptions = {internals: true}): this {
		const raw = JSON.parse(JSON.stringify(this.toJSON(undefined, options)));
		// tslint:disable-next-line:no-shadowed-variable
		const Model = this.constructor as new(model?: any) => this;
		return new Model().applyRaw(raw);
	}
}
