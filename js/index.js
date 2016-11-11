"use strict";

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
- I can create recipes that have names and ingredients.
- I can see an index view where the names of all the recipes are visible.
- I can click into any of those recipes to view it.
- I can edit these recipes.
- I can delete these recipes.
- All new recipes I add are saved in my browser's local storage. If I refresh the page, these recipes will still be there.
*/
/*
recipebox model
  recipebox
    id
    category
    name
    serves
    ingredients
    method
    comment
*/
// clear the console
console.clear();

// import components from ReactBootstrap
var _ReactBootstrap = ReactBootstrap;
var Alert = _ReactBootstrap.Alert;
var Button = _ReactBootstrap.Button;
var Modal = _ReactBootstrap.Modal;
var FormControl = _ReactBootstrap.FormControl;
var FormGroup = _ReactBootstrap.FormGroup;
var ControlLabel = _ReactBootstrap.ControlLabel;
var HelpBlock = _ReactBootstrap.HelpBlock;

var recipebox = [{
  id: 0,
  category: "Dips",
  recipename: "Mediteranean Salsa",
  serves: "6-12",
  ingredients: "2 cups cucumbers, 1 cup tomatoes, 2 cups mangoes",
  method: "Chop all ingredients into small pieces then mix together thoroughly. Should be consumed within half an hour of making.",
  comment: "Just like momma used to make!"
}, {
  id: 1,
  category: "Drinks",
  recipename: "Iced Tea",
  serves: "1 thirsty person",
  ingredients: "several tablespoons iced tea drink mix, 2 cups water",
  method: "Mix the iced tea mix into the water and stir well. Repeat as desired.",
  comment: "Great on a hot day!"
}, {
  id: 2,
  category: "Sandwiches",
  recipename: "Peanut Butter and Jelly Sandwich",
  serves: "2",
  ingredients: "2 tablespoons peanut butter, 2 tablespoons strawberry jelly, 2 slices of bread",
  method: "Spread peanut butter on one slice of bread and jelly on the other. Press both slices together. Cut in half if desired.",
  comment: "Enjoy with juice."
}];

// local storage
function storageAvailable(type) {
  try {
    var storage = window[type];
    var x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
}
if (storageAvailable('localStorage')) {
  // we can use localStorage
  if (!localStorage.getItem('_andydlindsay_recipebox')) {
    populateStorage();
  }
} else {
  // localStorage is not available
  console.log("No localStorage available.");
}
function populateStorage() {
  localStorage.setItem('_andydlindsay_recipebox', JSON.stringify(recipebox));
}

// title component

var Title = function (_React$Component) {
  _inherits(Title, _React$Component);

  function Title(props) {
    _classCallCheck(this, Title);

    return _possibleConstructorReturn(this, _React$Component.call(this, props));
  }

  Title.prototype.render = function render() {
    var titleClass = 'text-center heading-text-one';
    var codedByClass = 'text-center heading-text-two';
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        { className: titleClass },
        this.props.title
      ),
      React.createElement(
        "h5",
        { className: codedByClass },
        "Coded by ",
        React.createElement(
          "a",
          { target: "_blank", href: "https://www.freecodecamp.com/andydlindsay" },
          "Andy Lindsay"
        )
      )
    );
  };

  return Title;
}(React.Component);

Title.propTypes = {
  title: React.PropTypes.string
};
Title.defaultProps = {
  title: "Title"
};

// ingredients

var Ingredients = function (_React$Component2) {
  _inherits(Ingredients, _React$Component2);

  function Ingredients(props) {
    _classCallCheck(this, Ingredients);

    return _possibleConstructorReturn(this, _React$Component2.call(this, props));
  }

  Ingredients.prototype.render = function render() {
    // const Ingredient = this.props.ingredients.map((ingredient, id) => {
    //   return (
    //     <h5 key={id}>{ingredient.qty} {ingredient.name}</h5>
    //   );
    // });
    var Ingredient = this.props.ingredients.split(',').map(function (ingredient, id) {
      return React.createElement(
        "h5",
        { key: id },
        ingredient
      );
    });
    return React.createElement(
      "div",
      null,
      Ingredient
    );
  };

  return Ingredients;
}(React.Component);

// return FormGroup based on arguments

function FieldGroup(_ref) {
  var id = _ref.id;
  var label = _ref.label;
  var help = _ref.help;

  var props = _objectWithoutProperties(_ref, ["id", "label", "help"]);

  return React.createElement(
    FormGroup,
    { controlId: id },
    React.createElement(
      ControlLabel,
      null,
      label
    ),
    React.createElement(FormControl, props),
    help && React.createElement(
      HelpBlock,
      null,
      help
    )
  );
}

// add/edit recipe form

var RecipeForm = function (_React$Component3) {
  _inherits(RecipeForm, _React$Component3);

  function RecipeForm(props) {
    _classCallCheck(this, RecipeForm);

    return _possibleConstructorReturn(this, _React$Component3.call(this, props));
  }

  RecipeForm.prototype.updateRecipeProp = function updateRecipeProp(propname, event) {
    this.props.recipe[propname] = event.target.value;
    this.props.updateStorage();
    this.forceUpdate();
  };

  RecipeForm.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "form",
        null,
        React.createElement(FieldGroup, {
          id: "recipename",
          type: "text",
          label: "Recipe Name",
          onChange: this.updateRecipeProp.bind(this, "recipename"),
          value: this.props.recipe.recipename
        }),
        React.createElement(FieldGroup, {
          id: "category",
          type: "text",
          label: "Category",
          onChange: this.updateRecipeProp.bind(this, "category"),
          value: this.props.recipe.category
        }),
        React.createElement(FieldGroup, {
          id: "serves",
          type: "text",
          label: "Serves",
          onChange: this.updateRecipeProp.bind(this, "serves"),
          value: this.props.recipe.serves
        }),
        React.createElement(FieldGroup, {
          id: "ingredients",
          type: "text",
          componentClass: "textarea",
          label: "Ingredients",
          help: "Separate ingredients with a comma.",
          onChange: this.updateRecipeProp.bind(this, "ingredients"),
          value: this.props.recipe.ingredients
        }),
        React.createElement(FieldGroup, {
          id: "method",
          type: "text",
          componentClass: "textarea",
          label: "Method",
          onChange: this.updateRecipeProp.bind(this, "method"),
          value: this.props.recipe.method
        }),
        React.createElement(FieldGroup, {
          id: "comment",
          type: "text",
          label: "Comment",
          onChange: this.updateRecipeProp.bind(this, "comment"),
          value: this.props.recipe.comment
        })
      )
    );
  };

  return RecipeForm;
}(React.Component);

// add/edit recipe modal

var NewRecipe = function (_React$Component4) {
  _inherits(NewRecipe, _React$Component4);

  function NewRecipe(props) {
    _classCallCheck(this, NewRecipe);

    var _this4 = _possibleConstructorReturn(this, _React$Component4.call(this, props));

    _this4.state = {
      message: ""
    };
    return _this4;
  }

  NewRecipe.prototype.saveRecipe = function saveRecipe() {
    if (this.props.recipe.id === undefined) {
      if (this.props.recipe.ingredients !== undefined && this.props.recipe.recipename !== undefined) {
        this.props.recipe.id = Math.floor(Math.random() * 10000);
        this.props.addRecipe(this.props.recipe);
        this.state.message = "";
        this.props.updateStorage();
        this.props.closeModal();
      } else {
        this.state.message = "You must enter a recipe name and at least one ingredient.";
      }
    } else {
      this.props.closeModal();
    }
    console.log(this.state.message);
  };

  NewRecipe.prototype.render = function render() {
    var _this5 = this;

    var recipeName = this.props.recipe.recipename === undefined ? "New Recipe" : this.props.recipe.recipename;
    return React.createElement(
      "div",
      null,
      React.createElement(
        Modal,
        { show: this.props.show, onHide: function onHide() {
            _this5.props.closeModal();
          } },
        React.createElement(
          Modal.Header,
          { closeButton: true },
          React.createElement(
            Modal.Title,
            null,
            React.createElement(
              "b",
              null,
              recipeName
            )
          )
        ),
        React.createElement(
          Modal.Body,
          null,
          React.createElement(RecipeForm, { updateStorage: this.props.updateStorage, recipe: this.props.recipe })
        ),
        React.createElement(
          Modal.Footer,
          null,
          React.createElement(
            Button,
            { onClick: function onClick() {
                _this5.saveRecipe();
              }, bsStyle: "primary" },
            "Save"
          )
        )
      )
    );
  };

  return NewRecipe;
}(React.Component);

// recipe box

var RecipeBox = function (_React$Component5) {
  _inherits(RecipeBox, _React$Component5);

  function RecipeBox(props) {
    _classCallCheck(this, RecipeBox);

    var _this6 = _possibleConstructorReturn(this, _React$Component5.call(this, props));

    _this6.state = {
      recipebox: JSON.parse(localStorage.getItem('_andydlindsay_recipebox')),
      showModal: false,
      activeRecipe: {}
    };
    return _this6;
  }

  RecipeBox.prototype.deleteRecipe = function deleteRecipe(id) {
    var remainingItems = this.state.recipebox.filter(function (el) {
      return id !== el.id;
    });
    this.setState({
      recipebox: remainingItems
    });
    localStorage.setItem('_andydlindsay_recipebox', JSON.stringify(remainingItems));
  };

  RecipeBox.prototype.addRecipe = function addRecipe(recipe) {
    this.state.recipebox.push(recipe);
  };

  RecipeBox.prototype.closeModal = function closeModal() {
    this.setState({
      showModal: false
    });
  };

  RecipeBox.prototype.openModal = function openModal(activeRecipe) {
    this.setState({
      showModal: true,
      activeRecipe: activeRecipe
    });
  };

  RecipeBox.prototype.updateStorage = function updateStorage() {
    localStorage.setItem('_andydlindsay_recipebox', JSON.stringify(this.state.recipebox));
  };

  RecipeBox.prototype.render = function render() {
    var _this7 = this;

    var RecipeComponents = this.state.recipebox.map(function (recipe, id) {
      return React.createElement(
        "div",
        { key: recipe.id, className: "panel panel-default" },
        React.createElement(
          "div",
          { className: "panel-heading" },
          React.createElement(
            "h2",
            { className: "panel-title" },
            React.createElement(
              "a",
              { "data-toggle": "collapse", "data-parent": "#accordion", href: '#collapse' + id },
              recipe.recipename
            )
          )
        ),
        React.createElement(
          "div",
          { id: 'collapse' + id, className: "panel-collapse collapse" },
          React.createElement(
            "div",
            { className: "panel-body" },
            React.createElement(
              "h4",
              { className: "float-left" },
              "Category: ",
              recipe.category
            ),
            React.createElement(
              "h4",
              { className: "float-right comment-text text-right" },
              recipe.comment
            ),
            React.createElement(
              "h4",
              { className: "clear-left" },
              "Serves: ",
              recipe.serves
            ),
            React.createElement(Ingredients, { ingredients: recipe.ingredients }),
            React.createElement(
              "h4",
              null,
              recipe.method
            ),
            React.createElement(
              Button,
              { bsStyle: "primary", onClick: function onClick() {
                  _this7.openModal(recipe);
                } },
              "Edit Recipe"
            ),
            React.createElement(
              "button",
              { type: "button", onClick: function onClick() {
                  _this7.deleteRecipe(recipe.id);
                }, className: "btn btn-warning" },
              "Delete Recipe"
            )
          )
        )
      );
    }, this);
    return React.createElement(
      "div",
      { className: "recipe-text" },
      React.createElement(
        "div",
        { id: "accordion", className: "panel-group rounded-corners" },
        RecipeComponents
      ),
      React.createElement(
        "div",
        null,
        React.createElement(
          Button,
          { bsStyle: "primary", onClick: function onClick() {
              _this7.openModal({});
            } },
          "Add Recipe"
        )
      ),
      React.createElement(NewRecipe, { show: this.state.showModal, recipe: this.state.activeRecipe, updateStorage: this.updateStorage.bind(this), addRecipe: this.addRecipe.bind(this), closeModal: this.closeModal.bind(this) })
    );
  };

  return RecipeBox;
}(React.Component);

// app component

var App = function (_React$Component6) {
  _inherits(App, _React$Component6);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _React$Component6.call(this));
  }

  App.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3" },
      React.createElement(Title, { title: "Recipe Box" }),
      React.createElement(
        "div",
        { id: "accordion rounded-corners" },
        React.createElement(RecipeBox, null)
      )
    );
  };

  return App;
}(React.Component);

// render app

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
