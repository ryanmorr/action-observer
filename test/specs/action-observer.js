import { observe, unobserve, wasTriggered, disable } from '../../src/action-observer';

function triggerEvent(el, type) {
    const event = document.createEvent('Event');
    event.initEvent(type, true, true);
    el.dispatchEvent(event);
}

document.body.innerHTML += `
    <a id="link" href="#" data-ao="link"></a>
    <form id="form" method="GET" action="#" data-ao="form"></form>
`;

describe('action-observer', () => {
    it('should support capturing click events', () => {
        const link = document.getElementById('link');
        const spy = sinon.spy((e) => e.preventDefault());

        observe('link', spy);
        
        triggerEvent(link, 'click');

        const spyCall = spy.getCall(0);
        expect(spy.calledOnce).to.equal(true);
        expect(spyCall.args[0] instanceof Event).to.equal(true);
        expect(spyCall.args[0].type).to.equal('click');
        expect(spyCall.args[1]).to.equal(link);
        expect(wasTriggered('link')).to.equal(true);
    });

    it('should support capturing submit events', () => {
        const form = document.getElementById('form');
        const spy = sinon.spy((e) => e.preventDefault());

        observe('form', spy);
        
        triggerEvent(form, 'submit');

        const spyCall = spy.getCall(0);
        expect(spy.calledOnce).to.equal(true);
        expect(spyCall.args[0] instanceof Event).to.equal(true);
        expect(spyCall.args[0].type).to.equal('submit');
        expect(spyCall.args[1]).to.equal(form);
        expect(wasTriggered('form')).to.equal(true);
    });

    it('should support callbacks being removed', () => {
        const link = document.getElementById('link');
        const spy = sinon.spy((e) => e.preventDefault());

        observe('link', spy);
        
        triggerEvent(link, 'click');
        expect(spy.calledOnce).to.equal(true);

        unobserve('link', spy);

        triggerEvent(link, 'click');
        expect(spy.calledOnce).to.equal(true);
    });

    it('should support functionality being disabled', () => {
        const link = document.getElementById('link');
        const spy = sinon.spy();

        observe('link', spy);

        disable();

        triggerEvent(link, 'click');
        expect(spy.called).to.equal(false);
    });
});
