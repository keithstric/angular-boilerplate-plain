export const serialMetadataKey = Symbol();
export const internalMetadataKey = Symbol();
export const rawKeyMetadataKey = Symbol();
export const modelKeyMetadataKey = Symbol();

export interface SerializationOptions {
	internals?: boolean; // when true, include @Internal() fields in the serialization
}

export interface Serial<Raw, Model> {
	/**
	 * Take a model and turn it into a Raw JSON object
	 * @param model {Model}
	 * @param options {SerializationOptions}
	 */
	serialize(model?: Model, options?: SerializationOptions): Raw;

	/**
	 * Take a raw JSON object and turn it into a model class
	 * @param raw {Raw} a raw JSON object
	 */
	deserialize(raw?: Raw): Model;
}
