if (Meteor.isClient) {

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
    var htmlFunc = function () { return "<div>Hello</div>" };

    var buildAnnotations = function () {
      return secondAnnotation (function () {
        return firstAnnotation(htmlFunc);
      });
    };

    var annotatedHtml = renderAnnotations(buildAnnotations);

    console.log("1st Step: Annotate Html:");
    console.log(annotatedHtml);

    console.log("");
    console.log("2nd Step: Materialize Html:");
    var frag = Spark.render(buildAnnotations);

    console.log("");
    console.log("3rd Step: Return Document Fragment:");
    console.log(frag);
  }

  Meteor.startup(printSampleAnnotations);
}
