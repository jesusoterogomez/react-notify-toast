import {defaults} from './defaults';

/**
 * This was created as an ES6 class with a getter for the styles to allow for recomputing
 * dynamic values on each usage without calling a function.
 */
class Stylesheet {
    get styles() {
        return {
            container: {
                position: 'fixed',
                width: '50%',
                margin: '0 auto',
                right: '0px',
                top: '-100px',
                left: '0px',
                textAlign: 'center',
                zIndex: defaults.zIndex,
                pointerEvents: 'none',
                transition: 'all ' + defaults.animationDuration + 'ms ease',
                transform: 'translateY(0px)',

                // Vendor Prefixes
                msTransition: 'all ' + defaults.animationDuration + 'ms ease',
                msTransform: 'translateY(0px)',
                WebkitTransition: 'all ' + defaults.animationDuration + 'ms ease',
                WebkitTransform: 'translateY(0px)',
                OTransition: 'all ' + defaults.animationDuration + 'ms ease',
                OTransform: 'translateY(0px)',
                MozTransition: 'all ' + defaults.animationDuration + 'ms ease',
                MozTransform: 'translateY(0px)'
            },
            content: {
                cursor: 'pointer',
                display: 'inline',
                width: 'auto',
                borderRadius: '0 0 4px 4px',
                backgroundColor: 'white',
                padding: '10px 30px',
                pointerEvents: 'all'
            },
            show: {
                transform: 'translateY(108px)',
                msTransform: 'translateY(108px)',
                WebkitTransform: 'translateY(108px)',
                OTransform: 'translateY(108px)',
                MozTransform: 'translateY(108px)'
            },
            hide: {
                transform: 'translateY(-108px)',
                msTransform: 'translateY(-108px)',
                WebkitTransform: 'translateY(-108px)',
                OTransform: 'translateY(-108px)',
                MozTransform: 'translateY(-108px)'
            }
        };
    }
}

export default new Stylesheet();
