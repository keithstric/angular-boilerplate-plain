# app-card

This is a basic card component

## Properties

* cardTitle - string - The title of the card
* cardSubTitle - string - The sub title of the card

## ng-content sections

* content - This should be the card's content html
* actions - This should be the card's actions html

## Usage

```html
<app-card 
  cardTitle="Custom Title"
  cardSubTitle="Custom Sub-Title">
  <div content>
    Content Section
  </div>
  <div actions>
    <button>Action Button</button>
  </div>
</app-card>
```
