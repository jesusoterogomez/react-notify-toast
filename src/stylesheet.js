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
                top: defaults.top,
                left: '0px',
                textAlign: 'center',
                zIndex: defaults.zIndex,
                pointerEvents: 'none',
                transition: 'all ' + defaults.animationDuration + 'ms ease',
                transform: 'translateY(-100%)',

                // Vendor Prefixes
                msTransition: 'all ' + defaults.animationDuration + 'ms ease',
                msTransform: 'translateY(-100%)',
                WebkitTransition: 'all ' + defaults.animationDuration + 'ms ease',
                WebkitTransform: 'translateY(-100%)',
                OTransition: 'all ' + defaults.animationDuration + 'ms ease',
                OTransform: 'translateY(-100%)',
                MozTransition: 'all ' + defaults.animationDuration + 'ms ease',
                MozTransform: 'translateY(-100%)'
            },
            content: {
                cursor: 'pointer',
                display: 'inline-block',
                width: 'auto',
                borderRadius: '0 0 4px 4px',
                backgroundColor: 'white',
                padding: '10px 30px',
                pointerEvents: 'all'
            },
            show: {
                transform: 'translateY(0)',
                msTransform: 'translateY(0)',
                WebkitTransform: 'translateY(0)',
                OTransform: 'translateY(0)',
                MozTransform: 'translateY(0)'
            },
            hide: {
                transform: 'translateY(-100%)',
                msTransform: 'translateY(-100%)',
                WebkitTransform: 'translateY(-100%)',
                OTransform: 'translateY(-100%)',
                MozTransform: 'translateY(-100%)'
            }
        };
    }
}

export default new Stylesheet();
