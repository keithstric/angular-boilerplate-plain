# models

This is the base model configuration. Shared models should be placed in the `src/app/shared/models` directory

## decorators

### `@Serial`

Will serialize/deserialize properties into their appropriate model class

```typescript
export interface RawSerialMember {
	memberProp: string;
}

export interface RawSomeModel {
	serialMember: RawSerialMember;
}

class SerialMemberMapping extends Mapping<RawSerialMember> {}
export interface SerialMember extends Model<SerialMemberMapping> {}
export const SerialMember = createModel<SerialMember>(SerialMemberMapping);

class SomeModelMapping extends Mapping<RawSomeModel> {
	@Serial(SerialMember) serialMember: SerialMember;
}
export interface SomeModel extends Model<SomeModelMapping> {}
export const SomeModel = createModel<SomeModel>(SomeModelMapping);
```

### `@Internal`

Behaves similarly to `@Serial` but will not include this property in the raw object during serialization.

## Methods

### serialize(model?: any)

Will take a model and serialize it to it's "raw" JSON object form.

```typescript
export interface RawSerialMember {
	memberProp: string;
}

export interface RawSomeModel {
	serialMember: RawSerialMember;
	someId: string;
}

class SerialMemberMapping extends Mapping<RawSerialMember> {}
export interface SerialMember extends Model<SerialMemberMapping> {}
export const SerialMember = createModel<SerialMember>(SerialMemberMapping);

class SomeModelMapping extends Mapping<RawSomeModel> {
	@Serial(SerialMember) serialMember: SerialMember;

	get id() {
		return this.someId;
	}
}
export interface SomeModel extends Model<SomeModelMapping> {}
export const SomeModel = createModel<SomeModel>(SomeModelMapping);

const someModelJson = {
	"serialMember": {"memberProp": "foo"},
	"someId": "abc123"
}
const someModel = SomeModel.derialize(someModelJson);
console.log('someModel=', someModel);
// >> 'someModel=' {
//	serialMember: {memberProp: 'foo'},
// 	someId: 'abc123'
// 	id: 'abc123'
//}

const someModelSerialized = SomeModel.serialize(someModel);
console.log('someModelSerialized=', someModelSerialized);
// >> 'someModelSerialized=' {
// 	"serialMember": {"memberProp": "foo"},
// 	"someId": "abc123"
// }
```

### deserialize(model?: any)

Will take a raw JSON object and convert it to it's model form.

```typescript
export interface RawSerialMember {
	memberProp: string;
}

export interface RawSomeModel {
	serialMember: RawSerialMember;
	someId: string;
}

class SerialMemberMapping extends Mapping<RawSerialMember> {}
export interface SerialMember extends Model<SerialMemberMapping> {}
export const SerialMember = createModel<SerialMember>(SerialMemberMapping);

class SomeModelMapping extends Mapping<RawSomeModel> {
	@Serial(SerialMember) serialMember: SerialMember;

	get id() {
		return this.someId;
	}
}
export interface SomeModel extends Model<SomeModelMapping> {}
export const SomeModel = createModel<SomeModel>(SomeModelMapping);

const someModelJson = {
	"serialMember": {"memberProp": "foo"},
	"someId": "abc123"
}
const someModel = SomeModel.deserialize(someModelJson);
console.log('someModel=', someModel);
// >> 'someModel=' {
//	serialMember: {memberProp: 'foo'},
// 	someId: 'abc123'
// 	id: 'abc123'
//}

```

### clone(options: SerializationOptions)

Will perform a deep clone on a model

### toJson

Convert a model to JSON. Will include any @Internal properties

### applyRaw(raw?: Parital\<Raw\>)

Update a model's properties from the raw JSON object's properties
