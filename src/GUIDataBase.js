class DataBase {

   constructor(useSessionStorage = false) {
		if(useSessionStorage == undefined || useSessionStorage == false) {
			this.database = window.localStorage;
		} else {
			this.database = window.sessionStorage;
		}
	}	

	deleteDataBase()
	{
		this.database.clear();
	}
	
	deleteTable(table)
	{
		this.database.removeItem(table);
	}
		
	deleteField(table, field)
	{
		let champ = table[field];
		this.database.removeItem(champ);
	}
	
	deleteItemFromField(table, field, item)
	{
		let valeur = table[field][item];
		this.database.removeItem(item);
	}		
	
	addTable(table)
	{
		let empty = JSON.stringify({});
		this.database.setItem(table, empty);
	}
	
	createField(table, field, value)
	{	
		let data = JSON.stringify(value);
		let json = eval("({" + field + " : "+data+"})");
		this.database.setItem(table, JSON.stringify(json));		
	}
	
	insertItemFromField(table, field, item, value)
	{		
		let data = JSON.stringify(value);
		this.database.setItem(table[field][item], data); 
	}
	
	selectItem(table, field, item) 
	{		
		let theTable = $.parseJSON(this.database[table]);
		return theTable[field][item];
	}		
		
	selectAllItems(table, field)
	{
		let theTable = $.parseJSON(this.database[table][field]);
		return theTable;
	}
	
	selectAllTable(table)
	{
		let theTable = $.parseJSON(this.database[table]);
		return theTable;
	}
	
	selectAllDataBase()
	{
		return $.parseJSON(this.database);
	}
	
	updateItem(table, field, item, value)
	{		
		this.database[table][field][item] = value;
	}
	
	getLimit()
	{
		return this.database.length - 1;
	}
	
	isSupported()
	{
		if(typeof localStorage != 'undefined') {
			return true;
		} else {			
			return false;
		}
	}

}