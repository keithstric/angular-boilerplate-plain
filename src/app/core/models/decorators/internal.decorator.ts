// decorator to prevent class member from being serialized
import {internalMetadataKey} from '../serializers/serial';

export function Internal() {
	return (target: any, propertyKey: string) => {
		const prevInternalKeys = Reflect.getMetadata(internalMetadataKey, target) || [];
		const internalKeys = [...prevInternalKeys, propertyKey];
		Reflect.defineMetadata(internalMetadataKey, internalKeys, target);
	};
}
