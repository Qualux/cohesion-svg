import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { 
    TextControl, 
    PanelBody, 
    PanelRow,
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import './editor.scss';
import { generateStyles } from './utils';

function generateStyleId() {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 10);
    return (timestamp + randomPart).substring(0, 10);
}

export default function Edit({ attributes, setAttributes }) {

    const { svgPath, svg, styles, styleId } = attributes;

    useEffect(() => {
        if (!styleId) {
            setAttributes({ styleId: generateStyleId() });
        }
    }, []);

    useEffect(() => {
        if (svgPath) {
            fetchSvg(svgPath);
        }
    }, [svgPath]);

    const onChangeSvgPath = (newSvgPath) => {
        setAttributes({ svgPath: newSvgPath });
    };

    const fetchSvg = async (path) => {
        try {
            const response = await fetch(`${cohesionSVG_Settings.pluginUrl}svg/${path}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch SVG: ${path}`);
            }
            const svgText = await response.text();
            setAttributes({ svg: svgText });
        } catch (error) {
            console.error('Error fetching SVG:', error);
        }
    };

    const updateStyle = (property, val) => {
        setAttributes({ 
            styles: {
                ...styles,
                [property]: val,
            }
        });
    };  

    const blockProps = useBlockProps({
        className: `block-cohesion-svg-${styleId}`
    });

    return (
        <>
            <InspectorControls>
                <PanelBody
                    title={__('SVG Selection', 'cohesion')}
                    initialOpen={true}
                >
                    <PanelRow>
                        <TextControl
                            label={ __("SVG Path", "cohesion") }
                            value={ svgPath }
                            onChange={ onChangeSvgPath }
                            placeholder="/fa/solid/address-book.svg"
                        />
                    </PanelRow>
                    <PanelRow>
                        <TextControl
                            label={ __("Width", "cohesion") }
                            value={ styles.width }
                            onChange={ (val) => updateStyle('width', val) }
                            placeholder="16px"
                        />
                    </PanelRow>
                    <PanelRow>
                        <TextControl
                            label={ __("Height", "cohesion") }
                            value={ styles.height }
                            onChange={ (val) => updateStyle('height', val) }
                            placeholder=""
                        />
                    </PanelRow>
                    <PanelRow>
                        <TextControl
                            label={ __("Fill", "cohesion") }
                            value={ styles.fill }
                            onChange={ (val) => updateStyle('fill', val) }
                            placeholder="#212121"
                        />
                    </PanelRow>
                </PanelBody>
            </InspectorControls>
            <div {...blockProps} dangerouslySetInnerHTML={{ __html: svg }} />
            <style>{generateStyles(styleId, styles)}</style>
        </> 
    );
}
