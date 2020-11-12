import {modelKeyMetadataKey, rawKeyMetadataKey} from '../serializers/serial';

// decorator to rename a field when deserializing
export function Rename(rawKey: string) {
	return (target: any, propertyKey: string) => {
		Reflect.defineMetadata(rawKeyMetadataKey, rawKey, target, propertyKey);
		Reflect.defineMetadata(modelKeyMetadataKey, propertyKey, target, rawKey);
	};
}
