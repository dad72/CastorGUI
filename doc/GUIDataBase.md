## new [DataBase](#)(useSessionStorage)
Creates a new GUIDataBase

#### Parameters

| Name | Type | Description |
| --- | --- | --- |
| **useSessionStorage** | boolean | use the sessionStarage |
---

## Methods

### deleteDataBase() → void
Delete the DataBase

### deleteTable(database, table)
Delete table of the database

### deleteField(database, field) → void
Delete field of the database

### deleteItemFromField(database, field, item) → void
Delete item from field of database

### addTable(table) → void
Add table of the database

### createField(table, field, value)
Create new field of the table

### insertItemFromField(table, field, item, value)
insert new item from field

### selectItem(table, field, item)
Select item from field

### selectAllItems(table, field)
Select all item from field

### selectAllTable(table)
Select all table

### selectAllDataBase()
Select all database

### updateItem(table, field, item, value)
Update item from field

### getLimit()
Get limit of storage (max 5 Mo & 10Mo for IE)

### isSupported()
checks if localStorage or sessionStorage is supported
