if (Meteor.isClient) {

  function logWithColor (msg, color) {
    console.log("%c" + msg, "color:" + color + ";font-weight: bold;");
  }

  function renderAnnotations (fn) {
    var r = new Spark._Renderer;
    return Spark._currentRenderer.withValue(r, fn);
  }

  function printAnnotations (fn) {
    var annotatedHtml = renderAnnotations(fn);
    logWithColor("Annotated Html: ", "black");
    console.log(annotatedHtml);
  }

  function renderTemplateToBody (template) {
    document.body.appendChild(Spark.render(template));
  }

  /* reactive data source that invalidates contexts when value changes */
  var ReactiveData = {
    _value: "EventedMind",

    _contexts: new Meteor.deps._ContextSet,

    get: function () {
      this._contexts.addCurrentContext();
      return this._value;
    },

    set: function (value) {
      if (this._value !== value) {
        this._value = value;
        this._contexts.invalidateAll();
      }
    }
  };

  function renderWithIsolateAnnotation () {
    var htmlFunc = function () {
      /* this is reactive! */
      var data = ReactiveData.get();

      /* now return html */
      return "<h1>" + data + "</h1>";
    };

    var template = function () {
      return Spark.isolate(function () {
        return htmlFunc();
      });
    };

    renderTemplateToBody(template);
  }

  Meteor.startup(renderWithIsolateAnnotation);
}
