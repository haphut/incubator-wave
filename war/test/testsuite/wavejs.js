
var _model = undefined;
var WaveJS_Tester = {



    /**
     * Helper function for readability above.
     */
    extend: function(destination, source) {
      for (var property in source) destination[property] = source[property];
      return destination;
    },


    setupJasmine: function(elementIdForResults) {

      /**
       * ## Require &amp; Instantiate
       *
       * Require Jasmine's core files. Specifically, this requires and attaches all of Jasmine's code to the `jasmine` reference.
       */
      this.jasmine = jasmineRequire.core(jasmineRequire);

      /**
       * Since this is being run in a browser and the results should populate to an HTML page, require the HTML-specific Jasmine code, injecting the same reference.
       */
      jasmineRequire.html(this.jasmine);

      /**
       * Create the Jasmine environment. This is used to run all specs in a project.
       */
      var env = this.jasmine.getEnv();

      /**
       * ## The Global Interface
       *
       * Build up the functions that will be exposed as the Jasmine public interface. A project can customize, rename or alias any of these functions as desired, provided the implementation remains unchanged.
       */
      var jasmineInterface = jasmineRequire.interface(this.jasmine, env);

      /**
       * Add all of the Jasmine global/public interface to the proper global, so a project can use the public interface directly. For example, calling `describe` in specs instead of `jasmine.getEnv().describe`.
       */
      this.extend(this, jasmineInterface);
      this.extend(window, jasmineInterface);

      /**
       * ## Runner Parameters
       *
       * More browser specific code - wrap the query string in an object and to allow for getting/setting parameters from the runner user interface.
       */

      var queryString = new this.jasmine.QueryString({
        getWindowLocation: function() { return window.location; }
      });

      //var catchingExceptions = queryString.getParam("catch");
      //env.catchExceptions(typeof catchingExceptions === "undefined" ? true : catchingExceptions);

      env.catchExceptions(true);

      /**
       * ## Reporters
       * The `HtmlReporter` builds all of the HTML UI for the runner page. This reporter paints the dots, stars, and x's for specs, as well as all spec names and all failures (if any).
       */
      var htmlReporter = new this.jasmine.HtmlReporter({
        env: env,
        onRaiseExceptionsClick: function() { queryString.setParam("catch", !env.catchingExceptions()); },
        getContainer: function() { return document.getElementById(elementIdForResults); },
        createElement: function() { return document.createElement.apply(document, arguments); },
        createTextNode: function() { return document.createTextNode.apply(document, arguments); },
        timer: new this.jasmine.Timer()
      });

      /**
       * The `jsApiReporter` also receives spec results, and is used by any environment that needs to extract the results  from JavaScript.
       */
      env.addReporter(jasmineInterface.jsApiReporter);
      env.addReporter(htmlReporter);

      /**
       * Filter which specs will be run by matching the start of the full name against the `spec` query param.
       */
      var specFilter = new this.jasmine.HtmlSpecFilter({
        filterString: function() { return queryString.getParam("spec"); }
      });

      env.specFilter = function(spec) {
        return specFilter.matches(spec.getFullName());
      };

      /**
       * Setting up timing functions to be able to be overridden. Certain browsers (Safari, IE 8, phantomjs) require this hack.
       */
      window.setTimeout = window.setTimeout;
      window.setInterval = window.setInterval;
      window.clearTimeout = window.clearTimeout;
      window.clearInterval = window.clearInterval;


      htmlReporter.initialize();

     },


    describeTestBasic: function() {



      describe("Root map", function() {



        it("Inline strings", function() {

          var root_string1 = _model.root.put("root.string1","hello world");
          expect(_model.root.keySet()).toContain("root.string1");
          expect(root_string1.getValue()).toBe("hello world");
          expect(_model.root.get("root.string1").getValue()).toBe("hello world");

          var root_string2 = _model.root.put("root.string2","foo bar");
          expect(_model.root.keySet()).toContain("root.string1");
          expect(root_string2.getValue()).toBe("foo bar");
          expect(_model.root.get("root.string2").getValue()).toBe("foo bar");

        });


        it("Change map value with Declarative string", function() {

          var root_string3 = _model.root.put("root.string3", _model.createString());
          expect(_model.root.keySet()).toContain("root.string3");
          root_string3.setValue("hello world");
          expect(root_string3.getValue()).toBe("hello world");
          expect(_model.root.get("root.string3").getValue()).toBe("hello world");

          var root_string3 = _model.root.put("root.string3", "new hello world");
          expect(root_string3.getValue()).toBe("new hello world");
          expect(_model.root.get("root.string3").getValue()).toBe("new hello world");
        });


        it("Remove map elements", function() {

          var keyCountBefore = _model.root.keySet().length;

          _model.root.put("root.removeme","value");
          expect(_model.root.keySet().length).toBe(keyCountBefore+1);

          _model.root.remove("root.removeme");
          expect(_model.root.keySet().length).toBe(keyCountBefore);

          expect(_model.root.get("root.removeme")).toBeUndefined();
        });


        it("Nested map", function() {

          var root_map1 = _model.root.put("root.map1",_model.createMap());
          expect(_model.root.keySet()).toContain("root.map1");
          expect(_model.root.get("root.map1")).not.toBeUndefined();

          var root_map1_string1 = root_map1.put("root.map1.string1","foo bar");
          expect(_model.root.get("root.map1").keySet()).toContain("root.map1.string1");
          expect(root_map1.get("root.map1.string1").getValue()).toBe("foo bar");
        });


      });


      describe("Lists", function(){

        it("Add list to root map", function() {
          _model.root.put("root.list1", _model.createList());
          expect(_model.root.keySet()).toContain("root.list1");

          var root_list1 = _model.root.get("root.list1");
          expect(root_list1).not.toBeUndefined();
          expect(root_list1).not.toBeNull();

          expect(root_list1.values.length).toBe(0);
        });

        it("List and strings", function() {

          var root_list2 = _model.root.put("root.list2", _model.createList());

          var root_list2_string1 = root_list2.add(_model.createString());
          root_list2_string1.setValue("foo bar");

          expect(_model.root.get("root.list2").get(0).getValue()).toBe("foo bar");


          var root_list2_string2 = root_list2.add(_model.createString("hello world"));
          expect(root_list2_string2.getValue()).toBe("hello world");
          expect(_model.root.get("root.list2").get(1).getValue()).toBe("hello world");
        });



        it("List and maps", function(){

          var root_list3 = _model.root.put("root.list3", _model.createList());
          root_list3.add(_model.createMap());

          var root_list3_map1 = _model.root.get("root.list3").get(0);
          expect(root_list3_map1).not.toBeUndefined();
          expect(root_list3_map1).not.toBeNull();

          root_list3_map1.put("root.list3.map1.string1", "foo bar");
          expect(root_list3_map1.get("root.list3.map1.string1").getValue()).toBe("foo bar");

          // rewrite key
          root_list3_map1.put("root.list3.map1.string1", "new foo bar");
          expect(root_list3_map1.get("root.list3.map1.string1").getValue()).toBe("new foo bar");
        });


        it("List growth, and values array, nested list ", function(){

          var root_list4 = _model.root.put("root.list4", _model.createList());

          var listSizeBefore = root_list4.size();
          var listLengthBefore = root_list4.values.length;
          expect(listSizeBefore - listLengthBefore).toBe(0);

          var str = root_list4.add(_model.createString("string value"));
          var list = root_list4.add(_model.createList());
          var map = root_list4.add(_model.createMap());


          expect(root_list4.size()).toBe(listSizeBefore+3);
          //expect(root_list4.values.length).toBe(listLengthBefore+3);


          // list w/ string
          expect(root_list4.get(0).getValue()).toBe("string value");
          expect(_model.root.get("root.list4").values[0].getValue()).toBe("string value");

          // list of list
          root_list4.get(1).add(_model.createString("string value"));
          expect(root_list4.get(1).get(0).getValue()).toBe("string value");
          expect(_model.root.get("root.list4").values[1].get(0).getValue()).toBe("string value");

          // list w/ map
          root_list4.get(2).put("key",_model.createString("string value"));
          expect(_model.root.get("root.list4").values[2].get("key").getValue()).toBe("string value");

          // removing #1
          root_list4.remove(1);
          expect(root_list4.size()).toBe(listSizeBefore+2);
          expect(root_list4.get(1).get("key").getValue()).toBe("string value");
          expect(_model.root.get("root.list4").values[1].get("key").getValue()).toBe("string value");


          // removing #1
          root_list4.remove(1);
          expect(root_list4.size()).toBe(listSizeBefore+1);
          expect(root_list4.get(0).getValue()).toBe("string value");


        });

      });

    },


    runTestBasic: function(elementIdForResults) {

      this.setupJasmine(elementIdForResults);

      var self = this;

      this.modelid = WaveJS.createModel(

              function(model) {


                console.log("Created new model");
                _model = model; // pass the model as global var

                console.log("Running test");
                self.describeTestBasic();
                self.jasmine.getEnv().execute();

                console.log("Closing model "+self.modelid);
                WaveJS.closeModel(this.modelid);

               },

              function(error) {
                  console.log("Error creating data model for testing: "+ error)
                });


      return this.modelid;


    }

};