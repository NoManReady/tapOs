//获取指定form中的所有的<input>对象  
function getElements(formId) {
  const form = document.getElementById(formId)
  if (!form) {
    return []
  }
  const inputElements = form.getElementsByTagName('input') || []
  const textareaElements = form.getElementsByTagName('textarea') || []
  return [...inputElements, ...textareaElements]
}

//获取单个input中的【name,value】数组 
function inputSelector(element) {
  if (element.checked)
    return [element.name, element.value]
}

function input(element) {
  if (element.tagName.toLowerCase() === 'textarea') {
    return [element.name, element.value]
  }
  switch (element.type.toLowerCase()) {
    case 'submit':
    case 'hidden':
    case 'password':
    case 'text':
      return [element.name, element.value]
    case 'checkbox':
    case 'radio':
      return inputSelector(element)
  }
  return false
}


export function getFormData(formId) {
  const elements = getElements(formId)
  let formData = {}

  for (let i = 0; i < elements.length; i++) {
    const [key, value] = input(elements[i])
    formData[key] = value
  }

  return formData
}  
