import { observe, unobserve, getActions, disable } from '../../src/action-observer';

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

        unobserve('form');
    });

    it('should call an observe callback for a previously dispatched click event', () => {        
        const event = new MouseEvent('click', {bubbles: true});
        link.dispatchEvent(event);

        const spy = sinon.spy((e) => e.preventDefault());
        observe('link', spy);
    
        expect(spy.callCount).to.equal(1);
        expect(spy.args[0][0]).to.equal(event);
        expect(spy.args[0][1]).to.equal(link);
    
        unobserve('link');
    });

    it('should call an observe callback for a previously dispatched submit event', () => {
        const event = new Event('submit', {bubbles: true});
        form.dispatchEvent(event);

        const spy = sinon.spy((e) => e.preventDefault());
        observe('form', spy);

        expect(spy.callCount).to.equal(1);
        expect(spy.args[0][0]).to.equal(event);
        expect(spy.args[0][1]).to.equal(form);

        unobserve('form');
    });

    it('should call an observe callback for previous and future events', () => {        
        const event1 = new MouseEvent('click', {bubbles: true});
        link.dispatchEvent(event1);

        const spy = sinon.spy((e) => e.preventDefault());
        observe('link', spy);
    
        expect(spy.callCount).to.equal(1);
        expect(spy.args[0][0]).to.equal(event1);
        expect(spy.args[0][1]).to.equal(link);

        const event2 = new MouseEvent('click', {bubbles: true});
        link.dispatchEvent(event2);

        expect(spy.callCount).to.equal(2);
        expect(spy.args[1][0]).to.equal(event2);
        expect(spy.args[1][1]).to.equal(link);
    
        unobserve('link');
    });

    it('should return all captured actions', () => {
        let actions = getActions('link');
        expect(actions.length).to.equal(0);

        const event1 = new MouseEvent('click', {bubbles: true});
        link.dispatchEvent(event1);
        expect(actions.length).to.equal(1);
        expect(actions[0].event).to.equal(event1);
        expect(actions[0].element).to.equal(link);

        const event2 = new MouseEvent('click', {bubbles: true});
        link.dispatchEvent(event2);
        expect(actions.length).to.equal(2);
        expect(actions[1].event).to.equal(event2);
        expect(actions[1].element).to.equal(link);

        const event3 = new MouseEvent('click', {bubbles: true});
        link.dispatchEvent(event3);
        expect(actions.length).to.equal(3);
        expect(actions[2].event).to.equal(event3);
        expect(actions[2].element).to.equal(link);

        unobserve('link');
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
