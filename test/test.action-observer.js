describe('ActionObserver', function(){
    'use strict';

    var expect = chai.expect;

    function triggerEvent(el, type){
        var event = document.createEvent('Event');
        event.initEvent(type, true, true);
        el.dispatchEvent(event);
    }

    it('should capture click events', function(){
        var spy = sinon.spy(function(e){
            e.preventDefault();
        });
        ActionObserver.bind('link', spy);
        var link = document.getElementById('link');
        triggerEvent(link, 'click');
        var spyCall = spy.getCall(0);
        expect(spy.calledOnce).to.equal(true);
        expect(spyCall.args[0] instanceof Event).to.equal(true);
        expect(spyCall.args[0].type).to.equal('click');
        expect(spyCall.args[1]).to.equal(link);
        expect(ActionObserver.isTriggered('link')).to.equal(true);
    });

    it('should capture submit events', function(){
        var spy = sinon.spy(function(e){
            e.preventDefault();
        });
        ActionObserver.bind('form', spy);
        var form = document.getElementById('form');
        triggerEvent(form, 'submit');
        var spyCall = spy.getCall(0);
        expect(spy.calledOnce).to.equal(true);
        expect(spyCall.args[0] instanceof Event).to.equal(true);
        expect(spyCall.args[0].type).to.equal('submit');
        expect(spyCall.args[1]).to.equal(form);
        expect(ActionObserver.isTriggered('form')).to.equal(true);
    });

    it('should allow callbacks to be removed', function(){
        var spy = sinon.spy(function(e){
            e.preventDefault();
        });
        ActionObserver.bind('link', spy);
        var link = document.getElementById('link');
        triggerEvent(link, 'click');
        expect(spy.calledOnce).to.equal(true);
        ActionObserver.unbind('link', spy);
        triggerEvent(link, 'click');
        expect(spy.calledOnce).to.equal(true);
    });

    it('should allow to be disabled', function(){
        var spy = sinon.spy();
        ActionObserver.bind('link', spy);
        ActionObserver.disable();
        var link = document.getElementById('link');
        triggerEvent(link, 'click');
        expect(spy.called).to.equal(false);
    });

});