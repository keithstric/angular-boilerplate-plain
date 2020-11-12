import {Serial, serialMetadataKey} from '../serializers/serial';

export type Serializable = Serial<any, any> | [Serial<any, any>];

// decorator to automatically deserialize a field
export function Serial(serializable: Serializable) {
	return Reflect.metadata(serialMetadataKey, serializable);
}
