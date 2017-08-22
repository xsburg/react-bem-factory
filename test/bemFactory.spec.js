import bemFactory from '../src/index';

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
});
