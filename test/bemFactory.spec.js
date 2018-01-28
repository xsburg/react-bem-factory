import bemFactory from '../src/index';

beforeEach(() => {
    process.env.DEBUG = 'true';
    global.console.warn = jest.fn();
});

describe('bemFactory', () => {
    it('should produce block without elements', () => {
        // arrange
        const bem = bemFactory.block('block');

        // act
        const className = bem();

        // assert
        expect(className).toBe('block');
    });

    it('should produce block__element', () => {
        // arrange
        const bem = bemFactory.block('block');

        // act
        const className = bem('element');

        // assert
        expect(className).toBe('block__element');
    });

    it('should produce block__element name with unconditional modifiers', () => {
        // arrange
        const bem = bemFactory.block('block');

        // act
        const className = bem('element', 'modifier1');

        // assert
        expect(className).toBe('block__element block__element--modifier1');
    });

    it('should produce block__element mixed with another class', () => {
        // arrange
        const bem = bemFactory.block('block');

        // act
        const className = bem.add('foo')('element', 'modifier1');

        // assert
        expect(className).toBe('foo block__element block__element--modifier1');
    });

    it('should disregard falsy values in add() and produce block__element', () => {
        // arrange
        const bem = bemFactory.block('block');

        // act
        const className = bem.add(undefined)('element', 'modifier1');

        // assert
        expect(className).toBe('block__element block__element--modifier1');
    });

    it('should return qa builder', () => {
        // arrange

        // act
        const qa = bemFactory.qa('block');
        const qaId = qa();

        // assert
        expect(qaId).toBe('block');
    });

    it('should return themed builder', () => {
        // arrange
        const bem = bemFactory.block('button').themed('green');

        // act
        const className = bem();

        // assert
        expect(className).toBe('button--t-green');
    });

    it('should warn when modifier name is undefined', () => {
        // arrange
        const bem = bemFactory.block('block');

        // act
        const className1 = bem('element', 'undefined');
        const className2 = bem('element', { undefined: true });

        // assert
        expect(className1).toBe('block__element block__element--undefined');
        expect(className2).toBe('block__element block__element--undefined');
        // eslint-disable-next-line
        expect(console.warn).toHaveBeenCalledTimes(2);
    });
});
