var budgetcontroller = (function () {

})();

var UIcontroller = (function () {
    var DomString = {
        inputType: '.add__type',
        inputDes: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };

    return {
        getinput: function () {
            return {
                type: document.querySelector(DomString.inputType).value,
                description: document.querySelector(DomString.inputDes).value,
                valuee: document.querySelector(DomString.inputValue).value
            };
        },
        getDomString: function () {
            return DomString;
        }

    };

})();

var controller = (function (budgetctrl, uictrl) {
    var callEventListner = function () {
        var Dom = uictrl.getDomString();
        document.querySelector(Dom.inputBtn).addEventListener('click', ctrladdItem);
        document.querySelector('keypres', function (event) {
            if (event.keycode === 13 || event.which === 13)
                ctrladdItem();
        });
    }

    function ctrladdItem() {
        // 1. get the field input data 
        // 2.add the to the budget controller 
        var result = uictrl.getinput();

        // 3. add the item to the UI

        // 3.calculate the budget

        // 5. Display the  budget on the ui
    }
    return {
        init: function () {
            console.log('the application is started')
            callEventListner();
        }
    }

})(budgetcontroller, UIcontroller);
controller.init();