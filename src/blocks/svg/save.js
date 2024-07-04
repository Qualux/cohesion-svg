import { useBlockProps } from '@wordpress/block-editor';
import { generateStyles } from './utils';

export default function save({ attributes }) {

    const { svg, styles, styleId } = attributes;

    const blockProps = useBlockProps.save({
        className: `block-cohesion-svg-${styleId}`
    });

    return (
		<>
			<div {...blockProps} dangerouslySetInnerHTML={{ __html: svg }} />
			<style>{generateStyles(styleId, styles)}</style>
		</>
    );
}
