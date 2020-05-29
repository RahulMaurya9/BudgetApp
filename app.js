var budgetcontroller = (function () {

})();

var UIcontroller = (function () {

})();

var controller = (function (budgetctrl, uictrl) {
    function ctrladdItem() {
        // 1. get the field input data 

        // 2.add the to the budget controller 
        console.log('you click the enter button')

        // 3. add the item to the UI

        // 3.calculate the budget

        // 5. Display the  budget on the ui
    }
    document.querySelector('.add__btn').addEventListener('click', ctrladdItem);
    document.querySelector('keypres', function (event) {
        if (event.keycode === 13 || event.which === 13)
            ctrladdItem();
    });

})(budgetcontroller, UIcontroller);