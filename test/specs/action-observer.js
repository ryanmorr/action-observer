import { observe, unobserve, wasTriggered, disable } from '../../src/action-observer';

document.body.innerHTML += `
    <a id="link" href="#" action-observe="link"></a>
    <form id="form" method="GET" action="#" action-observe="form"></form>
`;

describe('action-observer', () => {
    it('should support capturing click events', () => {
        const link = document.getElementById('link');
        const spy = sinon.spy((e) => e.preventDefault());

        observe('link', spy);

        link.dispatchEvent(new MouseEvent('click', {bubbles: true}));

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

        form.dispatchEvent(new Event('submit', {bubbles: true}));

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

        link.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        expect(spy.calledOnce).to.equal(true);

        unobserve('link', spy);

        link.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        expect(spy.calledOnce).to.equal(true);
    });

    it('should support functionality being disabled', () => {
        const link = document.getElementById('link');
        const spy = sinon.spy();

        observe('link', spy);

        disable();

        link.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        expect(spy.called).to.equal(false);
    });
});
