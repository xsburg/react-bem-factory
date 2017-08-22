function computeModifiers (blockElement, modifiers) {
    return modifiers.map(m => {
        if (typeof m === 'object') {
            let result = [];
            for (let k in m) {
                if (m.hasOwnProperty(k)) {
                    const v = m[k];
                    if (v) {
                        result.push(`${blockElement}--${k}`);
                    }
                }
            }
            return result.join(' ');
        }
        return `${blockElement}--${m}`;
    }).join(' ');
}

export function bem (blockElement, ...modifiers) {
    const computedModifiers = computeModifiers(blockElement, modifiers);
    if (!computedModifiers) {
        return blockElement;
    }
    return `${blockElement} ${computedModifiers}`;
}

const bemFactory = {
    block (blockName) {
        let factory = (elementName, ...modifiers) => {
            const blockElement = elementName ? `${blockName}__${elementName}` : blockName;
            return bem(blockElement, ...modifiers);
        };
        factory.themed = (theme) => {
            return bemFactory.block(`${blockName}--t-${theme}`);
        };
        factory.add = (...classNames) => {
            const className = classNames.join(' ');
            if (!className) {
                return factory;
            }
            return (...args) => {
                return `${classNames} ${factory(...args)}`;
            };
        };
        return factory;
    },

    qa (blockName) {
        return bemFactory.block(blockName);
    }
};

export default bemFactory;
