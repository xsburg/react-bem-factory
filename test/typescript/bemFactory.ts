import bemFactory, { ElementFactory } from '../../src/index';

function elementFactoryBlock () {
    const bem: ElementFactory = bemFactory.block('block');

    const blockClass1: string = bem();
    const blockClass2: string = bem(null);
    const blockClass3: string = bem.add('foo')(null);

    const blockClass4: string = bem(null, 'modifier1', 'modifier2');
    const blockClass5: string = bem(null, 'modifier1', { modifier2: false });
}

function elementFactoryBlockElement () {
    const bem: ElementFactory = bemFactory.block('block');

    const blockElementClass1: string = bem('element');
    const blockElementClass2: string = bem.add('foo')('element');
    
    const blockElementClass3: string = bem('element', 'modifier1', 'modifier2');
    const blockElementClass4: string = bem('element', 'modifier1', { modifier2: false });
}

function qa () {
    const qa: ElementFactory = bemFactory.qa('block');
}

function themedBlock () {
    const bem: ElementFactory = bemFactory.block('block').themed('green');
}
