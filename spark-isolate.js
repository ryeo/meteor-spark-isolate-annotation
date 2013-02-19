if (Meteor.isClient) {

  function logWithColor (msg, color) {
    console.log("%c" + msg, "color:" + color + ";font-weight: bold;");
  }

  function renderAnnotations (fn) {
    var r = new Spark._Renderer;
    return Spark._currentRenderer.withValue(r, fn);
  }

  function firstAnnotation (htmlFunc) {
    var renderer = Spark._currentRenderer.get();

    if (!renderer) return htmlFunc();

    var materialize = function (range) {
      console.log("materialized first annotation");
    };

    return renderer.annotate(
      htmlFunc(),
      "first-annotation",
      materialize
    );
  }

  function secondAnnotation (htmlFunc) {
    var renderer = Spark._currentRenderer.get();

    if (!renderer) return htmlFunc();

    var materialize = function (range) {
      console.log("materialized second annotation");
    };

    return renderer.annotate(
      htmlFunc(),
      "second-annotation",
      materialize
    );
  }

  function printSampleAnnotations () {
    var htmlFunc = function () { return "<h1>I'm in the DOM!</h1>" };

    var buildAnnotations = function () {
      return secondAnnotation (function () {
        return firstAnnotation(htmlFunc);
      });
    };

    var annotatedHtml = renderAnnotations(buildAnnotations);

    logWithColor("1st Step: Annotate Html:", "green");
    console.log(annotatedHtml);

    console.log("");
    logWithColor("2nd Step: Materialize Html:", "darkorange");
    var frag = Spark.render(buildAnnotations);

    console.log("");
    logWithColor("3rd Step: Return Document Fragment:", "purple");
    console.log(frag);

    console.log("");
    logWithColor("4th Step: Append Fragment to DOM", "black");
    document.body.appendChild(frag);
  }

  function printTemplateAnnotations () {
    var annotatedHtml = renderAnnotations(Template.greetingButton);
    console.log(annotatedHtml);
  }

  Meteor.startup(printTemplateAnnotations);
}
