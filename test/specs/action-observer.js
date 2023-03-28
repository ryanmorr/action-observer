import { observe, unobserve, wasTriggered, disable } from '../../src/action-observer';

describe('action-observer', () => {
    const container = document.createElement('div');
    container.innerHTML += `
        <a href="#" action-observe="link"></a>
        <form method="GET" action="#" action-observe="form"></form>
    `;
    const link = container.firstElementChild;
    const form = container.lastElementChild;
    document.body.appendChild(container);

    it('should capture click events', () => {
        const spy = sinon.spy((e) => e.preventDefault());

        observe('link', spy);

        const event = new MouseEvent('click', {bubbles: true});
        link.dispatchEvent(event);

        expect(spy.callCount).to.equal(1);
        expect(spy.args[0][0]).to.equal(event);
        expect(spy.args[0][1]).to.equal(link);
        expect(wasTriggered('link')).to.equal(true);

        unobserve('link');
    });

    it('should capture submit events', () => {
        const spy = sinon.spy((e) => e.preventDefault());

        observe('form', spy);

        const event = new Event('submit', {bubbles: true});
        form.dispatchEvent(event);

        expect(spy.callCount).to.equal(1);
        expect(spy.args[0][0]).to.equal(event);
        expect(spy.args[0][1]).to.equal(form);
        expect(wasTriggered('form')).to.equal(true);

        unobserve('form');
    });

    it('should support callbacks being removed', () => {
        const spy = sinon.spy((e) => e.preventDefault());

        observe('link', spy);

        link.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        expect(spy.callCount).to.equal(1);

        unobserve('link', spy);

        link.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        expect(spy.callCount).to.equal(1);

        unobserve('link');
    });

    it('should support functionality being disabled', () => {
        const spy = sinon.spy();

        observe('link', spy);

        disable();

        link.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        expect(spy.callCount).to.equal(0);

        unobserve('link');
    });
});
