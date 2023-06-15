//Đối tượng
function Validator(options){
    function getParent(element, selector){
        while(element.parentElement){
            if(element.parentElement.matches(selector)){
                return element.parentElement;
            }
            element = element.parentElement
        }

    }
    var selectorRules = {

    }

    //Hàm thực hiện validate
    function validate(inputElement, rule){
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;

        //Lấy ra các rule của các selector
        var rules = selectorRules[rule.selector];

        //Lặp qua từng rule & kiểm tra
        //Nếu có lỗi thì dừng việc kiểm tra
        for( var i =0; i < rules.length; ++i){
            switch(inputElement.type){
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);

        }
            if(errorMessage) break;
        }

        if (errorMessage){
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid')
        } else {
            errorElement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid')

        }
        return !errorMessage;

    }

    //Lấy element của form
    var formElement = document.querySelector(options.form);
    if(formElement){
        formElement.onsubmit = function(e){
            e.preventDefault();

            var isFormValid = true;

            //Lặp qua từng rule và validate
            options.rules.forEach(function(rule){
            var inputElement = formElement.querySelector(rule.selector);
            var isValid = validate(inputElement, rule);
            if(!isValid){
                isFormValid = false;
            }
            });

            
            if(isFormValid){
                if(typeof options.onSubmit ==='function'){
                    
                    var enableInputs = formElement.querySelectorAll('[name]');
                    var formValues = Array.from(enableInputs).reduce(function(values, input){
                        
                        switch(input.type){
                            case  'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                            case 'checkbox':
                                if(!input.matches(':checked')) {
                                    values[input.name] = [];
                                    return values;
                                } 

                                if (!Array.isArray(values[input.name])){
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value)
                                break;
                            case 'file':
                                values[input.name] = input.files
                                break;
                            default:
                                values[input.name] = input.value;
                        }
                        return values;
        
                    },{});

                    options.onSubmit(formValues);
                }
                //Trường hợp submit với hành vi mặc định
                else {
                    formElement.submit();
                }
            }



        }

        



        //Lặp qua mỗi rule và xử lý lắng nghe sự kiện
        options.rules.forEach(function(rule){
            //Lưu lại các rules cho mỗi input
            if(Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test);
            } else {
            selectorRules[rule.selector] =[rule.test];
            }


            var inputElements = formElement.querySelectorAll(rule.selector)
            Array.from(inputElements).forEach(function(inputElement){
                 //Xử lý trường hợp blur khõi input
                 inputElement.onblur = function(){
                    validate(inputElement, rule)

                }
                //Xử lý trường hợp người dùng nhập vào input
                inputElement.oninput = function(){
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid')


                }
            });

        });

    }

}

//Rule
Validator.isRequired = function(selector, message){
    return{
        selector:selector,
        test:function(value){
            return value.trim() ? undefined :  message ||"Vui lòng nhập trường này"

        }
    };

}

Validator.isEmail = function(selector, message){
    return{
        selector:selector,
        test:function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined :  message || 'Trường này phải là email'

        }
    };
}

Validator.minLength = function(selector, min, message){
    return{
        selector:selector,
        test:function(value){
            return value.length > min ? undefined :  message || `Vui lòng nhập tối thiểu ${min} ký tự`

        }
    };
}

Validator.isConfirmed = function(selector, getConfirmValue, message){
    return {
        selector:selector,
        test:function(value){
            return value === getConfirmValue() ? undefined :  message || 'Giá trị nhập vào không chính xác'

        }
    }
}