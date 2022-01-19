
// Creé una promise para poder ejecutar el proyecto.

export const doLogin = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Si se ingresa lo mismo en username y en password rechazo la promise 
        if(username !== password){
            resolve("Success");
        } else {
            reject("Wrong credentials");
        }
    }, 1000);
  })
};

export const ejercicioSortAndFilter = () => {
  const objetos = [{date: new Date(2018, 1, 24), items: [{cosa: "no va"}]}, {date: new Date(2018, 11, 28), items: [{cosa: "cuarto"}]}, {date: new Date(2018, 11, 10), items: [{cosa: "segundo"}]}, {date: new Date(2018, 11, 25), items: [{cosa: "tercero"}]}, {date: new Date(2018, 11, 5), items: [{cosa: "primero"}]}, {date: new Date(2017, 7, 16), items: [{cosa: "no va"}]}];

  const yearAndMonthMatch = (element, dateToMatch) => {
    if(element.date.getFullYear() === dateToMatch.getFullYear() && element.date.getMonth() === dateToMatch.getMonth()){
      return{date: element.date, items: element.items};
    }
  }

  const sortByDate = (firstElement, secondElement) => {
    return firstElement.date - secondElement.date;
  }

  const getObjectsByDate = (array, date) => {
    return array.filter(function(element){
      return yearAndMonthMatch(element, date);
    }).sort(sortByDate).map(function(object) {return object.items;});
  }
  
  return getObjectsByDate(objetos, new Date(2018, 11));
}
