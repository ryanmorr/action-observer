/* eslint-disable max-len, no-unused-expressions */

import { expect } from 'chai';
import sinon from 'sinon';
import ao, { observe, unobserve, wasTriggered, disable } from '../src/ao';

function triggerEvent(el, type) {
    const event = document.createEvent('Event');
    event.initEvent(type, true, true);
    el.dispatchEvent(event);
}

describe('Action Observer', () => {
    it('should support importing of individual methods/properties (observe, unobserve, wasTriggered, disable)', () => {
        expect(observe).to.be.a('function');
        expect(unobserve).to.be.a('function');
        expect(wasTriggered).to.be.a('function');
        expect(disable).to.be.a('function');
    });

    it('should support importing of ao namespace', () => {
        expect(ao.observe).to.be.a('function');
        expect(ao.unobserve).to.be.a('function');
        expect(ao.wasTriggered).to.be.a('function');
        expect(ao.disable).to.be.a('function');
        expect(ao.observe).to.equal(observe);
        expect(ao.unobserve).to.equal(unobserve);
        expect(ao.wasTriggered).to.equal(wasTriggered);
        expect(ao.disable).to.equal(disable);
    });

    it('should capture click events', () => {
        const spy = sinon.spy((e) => {
            e.preventDefault();
        });
        observe('link', spy);
        const link = document.getElementById('link');
        triggerEvent(link, 'click');
        const spyCall = spy.getCall(0);
        expect(spy.calledOnce).to.equal(true);
        expect(spyCall.args[0] instanceof Event).to.equal(true);
        expect(spyCall.args[0].type).to.equal('click');
        expect(spyCall.args[1]).to.equal(link);
        expect(wasTriggered('link')).to.equal(true);
    });

    it('should capture submit events', () => {
        const spy = sinon.spy((e) => {
            e.preventDefault();
        });
        observe('form', spy);
        const form = document.getElementById('form');
        triggerEvent(form, 'submit');
        const spyCall = spy.getCall(0);
        expect(spy.calledOnce).to.equal(true);
        expect(spyCall.args[0] instanceof Event).to.equal(true);
        expect(spyCall.args[0].type).to.equal('submit');
        expect(spyCall.args[1]).to.equal(form);
        expect(wasTriggered('form')).to.equal(true);
    });

    it('should allow callbacks to be removed', () => {
        const spy = sinon.spy((e) => {
            e.preventDefault();
        });
        observe('link', spy);
        const link = document.getElementById('link');
        triggerEvent(link, 'click');
        expect(spy.calledOnce).to.equal(true);
        unobserve('link', spy);
        triggerEvent(link, 'click');
        expect(spy.calledOnce).to.equal(true);
    });

    it('should allow to be disabled', () => {
        const spy = sinon.spy();
        observe('link', spy);
        disable();
        const link = document.getElementById('link');
        triggerEvent(link, 'click');
        expect(spy.called).to.equal(false);
    });
});
