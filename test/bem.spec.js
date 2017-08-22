import { bem } from '../src/index';

describe('bem', () => {
    it('should combine several unconditional modifiers', () => {
        // arrange

        // act
        const className = bem('block__element', 'modifier1', 'modifier2');

        // assert
        expect(className).toBe('block__element block__element--modifier1 block__element--modifier2');
    });
    
    it('should exclude false conditional modifiers', () => {
        // arrange

        // act
        const className = bem('block__element', { modifier1: false, modifier2: true });

        // assert
        expect(className).toBe('block__element block__element--modifier2');
    });

    it('should combine several conditional modifiers', () => {
        // arrange

        // act
        const className = bem('block__element', { modifier1: true, modifier2: true });

        // assert
        expect(className).toBe('block__element block__element--modifier1 block__element--modifier2');
    });

    it('should combine conditional and unconditional modifiers', () => {
        // arrange

        // act
        const className = bem('block__element', 'modifier1', { modifier2: true });

        // assert
        expect(className).toBe('block__element block__element--modifier1 block__element--modifier2');
    });
});
