function Validator(formSelector) {
    var _this = this
    var formRules = {};

    function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }
  /**
   * Quy ước tạo rule:
   * -Nếu có lỗi thì return 'error message'
   * -Nếu không có lỗi thì return 'undefined'
   */
  var validatorRules = {
    required: function (value) {
      return value ? undefined : "Vui lòng nhập trường này";
    },
    email: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : "Vui lòng nhập email";
    },
    min: function (min) {
      return function (value) {
        return value.length >= min
          ? undefined
          : `Vui lòng nhập ít nhất ${min} ký tự`;
      };
    },
    max: function (max) {
      return function (value) {
        return value.length >= max
          ? undefined
          : `Vui lòng nhập tối đa ${max} ký tự`;
      };
    },
  };

  var formElement = document.querySelector(formSelector);
  //Lấy ra form element trong DOM theo 'formSelector'

  if (formElement) {
    var inputs = formElement.querySelectorAll("[name][rules]");
    for (var input of inputs) {
      var rules = input.getAttribute("rules").split("|");
      for (var rule of rules) {
        var ruleInfo;
        var isRuleHasValue = rule.includes(":");
        if (isRuleHasValue) {
          var ruleInfo = rule.split(":");
          rule = ruleInfo[0];
        }
        var ruleFunc = validatorRules[rule];
        if (isRuleHasValue) {
          ruleFunc = ruleFunc(ruleInfo[1]);
        }

        if (Array.isArray(formRules[input.name])) {
          formRules[input.name].push(ruleFunc);
        } else {
          formRules[input.name] = [validatorRules[rule]];
        }
      }
      //Lắng nghe sự kiện để validate( blur, change,...)
      input.onblur = handleValidate;
      input.oninput = handleClearErrors;
    }
    //Hàm thực hiện validate
    function handleValidate(event) {
      var rules = formRules[event.target.name];
      var errorMessage;
      

      for(var rule of rules){
          errorMessage = rule(event.target.value);
          if (errorMessage) break;
      }

      //Nếu có lỗi thì hiển thị message lỗi ra UI
      if (errorMessage) {
        var formGroup = getParent(event.target, ".form-group");
        if (formGroup) {
          formGroup.classList.add("invalid");
          var formMessage = formGroup.querySelector(".form-message");
          if (formMessage) {
            formMessage.innerHTML = errorMessage;
          }
        }
      }
      return !errorMessage;
    }
    //Hàm clear message lỗi
    function handleClearErrors(event) {
      var formGroup = getParent(event.target, ".form-group");
      if (formGroup.classList.contains("invalid")) {
        formGroup.classList.remove("invalid");
        var formMessage = formGroup.querySelector(".form-message");

        if (formMessage) {
          formMessage.innerHTML = "";
        }
      }
    }
  }
  //Xử lý hành vi submit form
  formElement.onsubmit = function (event) {
    event.preventDefault();

    
    var inputs = formElement.querySelectorAll("[name][rules]");
    var isValid = true;

    for (var input of inputs) {
      if (!handleValidate({ target: input })) {
        isValid = false;
      }
    }

    //Khi không cs lloxoi thifi submit form
    if (isValid) {
      if (typeof _this.onsubmit === "function") {
        var enableInputs = formElement.querySelectorAll("[name]");
        var formValues = Array.from(enableInputs).reduce(function (
          values,
          input
        ) {
          switch (input.type) {
            case "radio":
              values[input.name] = formElement.querySelector(
                'input[name="' + input.name + '"]:checked'
              ).value;
            case "checkbox":
              if (!input.matches(":checked")) {
                values[input.name] = [];
                return values;
              }

              if (!Array.isArray(values[input.name])) {
                values[input.name] = [];
              }
              values[input.name].push(input.value);
              break;
            case "file":
              values[input.name] = input.files;
              break;
            default:
              values[input.name] = input.value;
          }
          return values;
        },
        {});
        //Gọi lại hàm onsubmit và trả về giá trị của form
        _this.onSubmit(formValues);
      } else {
        formElement.submit();
      }
    }
  };
  // console.log(formRules)
}
