var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  if(matchFunc(startEl)) resultSet.push(startEl);

  for(let i=0; i < startEl.children.length; i++){
    var collectedElements = traverseDomAndCollectElements(matchFunc, startEl.children[i])
     resultSet = [...resultSet,...collectedElements] //resultSet.concat(collectedElements)
  }
  return resultSet
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag


var selectorTypeMatcher = function(selector) {
  // tu código aquí
  if(selector[0] === "#") return "id";

  if(selector[0] === ".") return "class";

  if(selector.split(".").length > 1) return "tag.class";

  return "tag"
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;

  if (selectorType === "id") { 
   matchFunction = function(arg){
    return "#" + arg.id === selector
   };
  } else if (selectorType === "class") {
    matchFunction = function(arg){
      for(let i=0; i < arg.classList.length; i++){   //classList genera un arreglo con todas los nombres de las clases
        if("." + arg.classList[i] === selector) return true  //donde cada elemento del arreglo es el nombre de una clase
      }
      return false
    } 
  } else if (selectorType === "tag.class") {
    matchFunction = function(arg){
      let [tag, clase] = selector.split(".");
      return matchFunctionMaker(tag)(arg) && matchFunctionMaker(clase)(arg)
    }
  } else if (selectorType === "tag") {
    matchFunction = function(arg){
      return arg.tagName && (arg.tagName.toLowerCase() === selector)
    }
  } 
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
