// TODO : BUDGET CONTROLLER MODULE
var budgetcontroller = (function () {
    var expenses = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
    expenses.prototype.calcPercent = function (totalinc) {
        if (totalinc > 0) {
            this.percentage = Math.round((this.value / totalinc) * 100);
        } else {
            this.percentage = -1;
        }
    };
    expenses.prototype.getPercent = function () {
        return this.percentage;
    }
    var income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var calculateTotal = function (type) {
        var sum = 0;
        data.additems[type].forEach(function (cur) {
            sum += cur.value
        })
        data.total[type] = sum;
    }
    var data = {
        additems: {
            exp: [],
            inc: []
        },
        total: {
            ex: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };
    return {
        addItem: function (type, des, val) {
            var newitems, ID;
            if (data.additems[type].length > 0) {
                ID = data.additems[type][data.additems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            if (type === 'exp') {
                newitems = new expenses(ID, des, val);
            } else if (type === 'inc') {
                newitems = new income(ID, des, val)
            }
            data.additems[type].push(newitems);
            return newitems;
        },
        calculateBudget: function () {
            //  calcualte total income and expenses
            calculateTotal('exp')
            calculateTotal('inc')
            // total budget
            data.budget = data.total.inc - data.total.exp;
            // percentage
            if (data.total.inc > 0) {
                data.percentage = Math.round((data.total.exp / data.total.inc) * 100)
            } else {
                data.percentage = -1;
            }
        },
        calculatePercentage: function () {
            data.additems.exp.forEach(function (cur) {
                cur.calcPercent(data.total.inc);
            });
        },
        getPercentage: function () {
            var allperc = data.additems.exp.map(function (cur) {
                return cur.getPercent();
            });
            return allperc;
        },
        deleteItem: function (type, id) {
            var ids, index;
            ids = data.additems[type].map(function (cur) {
                return cur.id;
            })
            index = ids.indexOf(id)
            if (index !== -1) {
                data.additems[type].splice(index, 1)
            } else {
                console.log('not working')
            }
        },
        checkbudget: function () {
            return {
                totalinc: data.total.inc,
                totalexp: data.total.exp,
                budget: data.budget,
                percent: data.percentage
            }
        },
        testing: function () {
            console.log(data);
        }
    };

})();
// TODO : UI CONTROLLER MODULE
var UIcontroller = (function () {
    var DomString = {
        inputType: '.add__type',
        inputDes: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        percentLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };
    var formatNumber = function(num , type){
        var numSplit,int , dec ,type;
        num = Math.abs(num);
        num=num.toFixed(2)
        numSplit= num.split('.');
        int = numSplit[0];
        if (int.length>3){
            int = int.substr(0,int.length-3) + ',' + int.substr(int.length-3, 3);
        }
        dec = numSplit[1];
        return (type=='exp' ? '-':'+') + '' + int+'.'+dec;
    };
    var nodeList = function (list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };
    return {
        getinput: function () {
            return {
                type: document.querySelector(DomString.inputType).value,
                description: document.querySelector(DomString.inputDes).value,
                value: parseFloat(document.querySelector(DomString.inputValue).value)
            };
        },
        addListItem: function (obj, type) {
            var html, newHTML, element;
            // create HTML strin with placeholder text
            if (type === 'inc') {
                element = DomString.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DomString.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            // replace the placeholder text with some actual
            newHTML = html.replace('%id%', obj.id);
            newHTML = newHTML.replace('%description%', obj.description);
            newHTML = newHTML.replace('%value%', formatNumber(obj.value,type));
            // insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
        },
        clearFields: function () {
            var fields,
                fields = document.querySelectorAll(DomString.inputDes + ',' + DomString.inputValue)
            fieldArray = Array.prototype.slice.call(fields)
            fieldArray.forEach(element => {
                element.value = "";
                fieldArray[0].focus();
            });
        },
        displayBudget: function (obj) {
            var type;
            obj.budget > 0? type='inc': type = 'exp'
            document.querySelector(DomString.budgetLabel).textContent = formatNumber(obj.budget,type);
            document.querySelector(DomString.incomeLabel).textContent = formatNumber(obj.totalinc,'inc');
            document.querySelector(DomString.expensesLabel).textContent = formatNumber(obj.totalexp,'exp');
            if (obj.percent > 0) {
                document.querySelector(DomString.percentageLabel).textContent = obj.percent;
            } else {
                document.querySelector(DomString.percentageLabel).textContent = 0;
            }
        },
        displayPercent: function (percentages) {
            var fields = document.querySelectorAll(DomString.percentLabel);
            nodeList(fields, function (cur, index) {
                if (percentages[index] > 0) {
                    cur.textContent = percentages[index] + '%';
                } else {
                    cur.textContent = '---';
                }
            })
        },
        deleteItemUI: function (selectorId) {
            var get = document.getElementById(selectorId)
            get.parentNode.removeChild(get);
        },
        displayMonth:function(){
            now = new Date()
            months=['january','Feburary','March','April','May','June','July','August','November','December']
            month = now.getMonth();
            years = now.getFullYear();
            document.querySelector(DomString.dateLabel).textContent = `${months[month]} ${years}`;
        },
        changedStyle : function(){
            var fields = document.querySelectorAll(
                DomString.inputType + ','+
                DomString.inputDes + ','+
                DomString.inputValue);
            nodeList(fields,function(cur){
                cur.classList.toggle('red-focus');
            });
            document.querySelector(DomString.inputBtn).classList.toggle('red');
        },
        getDomString: function () {
            return DomString;
        }
    };
})();
//  TODO : TOTAL CONTROLLER MODULE
var controller = (function (budgetctrl, uictrl) {
    var callEventListner = function () {
        var Dom = uictrl.getDomString();
        document.querySelector(Dom.inputBtn).addEventListener('click', ctrladdItem);
        document.querySelector('keypres', function (event) {
            if (event.keycode === 13 || event.which === 13)
                ctrladdItem();
        });
        document.querySelector(Dom.container).addEventListener('click', ctrlDeleteItem)
        document.querySelector(Dom.inputType).addEventListener('change',uictrl.changedStyle)
    };
    var updatebudget = function () {
        // calcualte the budget
        budgetctrl.calculateBudget();
        // return the budget
        var budget = budgetctrl.checkbudget();
        // display the budget on the ui
        uictrl.displayBudget(budget);
    };
    var ctrlDeleteItem = function (event) {
        var itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (itemId) {
            var splitId = itemId.split('-');
            var itemType = splitId[0]
            var ID = parseInt(splitId[1])
            // delete the item from data structure
            budgetctrl.deleteItem(itemType, ID)
            // delete the item from the UI
            uictrl.deleteItemUI(itemId)
            // update and show the new UI
            updatebudget();
            // cal update percentage
            updatePercentage();
        }
    };
    var updatePercentage = function () {
        budgetctrl.calculatePercentage();
        var percentagee = budgetctrl.getPercentage();
        uictrl.displayPercent(percentagee)
    }
    var ctrladdItem = function () {
        // 1. get the field input data 
        var result = uictrl.getinput();
        // 2.add the to the budget controller 
        if (result.description !== "" && !isNaN(result.value) && result.value > 0) {
            var newItem = budgetctrl.addItem(result.type, result.description, result.value)
            // 3. add the item to the UI
            uictrl.addListItem(newItem, result.type);
            // 3.clearing th elements
            uictrl.clearFields();
            // 4.calculate the budget
            updatebudget();
            // cal update percentage 
            updatePercentage();

        }
    }
    return {
        init: function () {
            console.log('the application is started');
            callEventListner();
            uictrl.displayMonth();
        }
    };
})(budgetcontroller, UIcontroller);
controller.init();