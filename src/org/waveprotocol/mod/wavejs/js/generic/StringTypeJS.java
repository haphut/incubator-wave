package org.waveprotocol.mod.wavejs.js.generic;


import com.google.gwt.core.client.JavaScriptObject;
import com.google.gwt.core.client.JsArrayString;

import org.waveprotocol.mod.model.generic.StringType;
import org.waveprotocol.mod.wavejs.WaveJSUtils;


public class StringTypeJS extends JavaScriptObject implements StringType.Listener {



  public native static StringTypeJS create(StringType delegate) /*-{

      var jso = {

        _delegate: delegate,

        callbackMap: new Object(),

        eventHandlers: new Object(),

        registerEventHandler: function(event, handler) {
          this.eventHandlers[event] = handler;
        },

        getDelegate: function() {
          return this._delegate;
        },

        unregisterEventHandler: function(event, handler) {
          this.eventHandlers[event] = null;
        },

        getValue: function() {
          return delegate.@org.waveprotocol.mod.model.generic.StringType::getValue()();
        },

        setValue: function(value) {
         delegate.@org.waveprotocol.mod.model.generic.StringType::setValue(Ljava/lang/String;)(value);
        }

      }; // jso

      return jso;

  }-*/;


  protected StringTypeJS() {

  }

  private final native void fireEvent(String event, Object parameter) /*-{

    if (this.eventHandlers[event] != null) {
      this.eventHandlers[event](parameter);
    }

  }-*/;

  private final native StringType getDelegate() /*-{
    return this._delegate;
  }-*/;




  @Override
  public final void onValueChanged(String oldValue, String newValue) {
    JsArrayString values = WaveJSUtils.createJsArrayString();
    values.push(newValue);
    values.push(oldValue);
    fireEvent("ITEM_CHANGED", values);
  }


}
