/**
 * Description: Multiplied fields in the same block
 * Author: Created by ubt
 * Date: 2016/9/7
 */
'use strict';


;(function() {
    module.exports = function(Xml) {
       
       /**
         * Decode an XML block tag and create a block (and possibly sub blocks) on the
         * workspace.
         * @param {!Element} xmlBlock XML block element.
         * @param {!Blockly.Workspace} workspace The workspace.
         * @return {!Blockly.Block} The root block created.
         * @private
         */
        Xml.domToBlockHeadless_ = function(xmlBlock, workspace) {
            var block = null;
            var prototypeName = xmlBlock.getAttribute('type');
            goog.asserts.assert(prototypeName, 'Block type unspecified: %s',
                                xmlBlock.outerHTML);
            var id = xmlBlock.getAttribute('id');
            block = workspace.newBlock(prototypeName, id);

            var blockChild = null;
            for (var i = 0, xmlChild; xmlChild = xmlBlock.childNodes[i]; i++) {
                if (xmlChild.nodeType == 3) {
                // Ignore any text at the <block> level.  It's all whitespace anyway.
                continue;
                }
                var input;

                // Find any enclosed blocks or shadows in this tag.
                var childBlockNode = null;
                var childShadowNode = null;
                for (var j = 0, grandchildNode; grandchildNode = xmlChild.childNodes[j];
                    j++) {
                if (grandchildNode.nodeType == 1) {
                    if (grandchildNode.nodeName.toLowerCase() == 'block') {
                    childBlockNode = grandchildNode;
                    } else if (grandchildNode.nodeName.toLowerCase() == 'shadow') {
                    childShadowNode = grandchildNode;
                    }
                }
                }
                // Use the shadow block if there is no child block.
                if (!childBlockNode && childShadowNode) {
                childBlockNode = childShadowNode;
                }

                var name = xmlChild.getAttribute('name');
                switch (xmlChild.nodeName.toLowerCase()) {
                case 'mutation':
                    // Custom data for an advanced block.
                    if (block.domToMutation) {
                    block.domToMutation(xmlChild);
                    if (block.initSvg) {
                        // Mutation may have added some elements that need initalizing.
                        block.initSvg();
                    }
                    }
                    break;
                case 'comment':
                    block.setCommentText(xmlChild.textContent);
                    var visible = xmlChild.getAttribute('pinned');
                    if (visible && !block.isInFlyout) {
                    // Give the renderer a millisecond to render and position the block
                    // before positioning the comment bubble.
                    setTimeout(function() {
                        if (block.comment && block.comment.setVisible) {
                        block.comment.setVisible(visible == 'true');
                        }
                    }, 1);
                    }
                    var bubbleW = parseInt(xmlChild.getAttribute('w'), 10);
                    var bubbleH = parseInt(xmlChild.getAttribute('h'), 10);
                    if (!isNaN(bubbleW) && !isNaN(bubbleH) &&
                        block.comment && block.comment.setVisible) {
                    block.comment.setBubbleSize(bubbleW, bubbleH);
                    }
                    break;
                case 'data':
                    block.data = xmlChild.textContent;
                    break;
                case 'title':
                    // Titles were renamed to field in December 2013.
                    // Fall through.
                case 'field':
                    var field = block.getField(name);
                    if (!field) {
                    console.warn('Ignoring non-existent field ' + name + ' in block ' +
                                prototypeName);
                    break;
                    }
                    field.setValue(xmlChild.textContent);
                    if (block.convertValueToText) {
                        block.convertValueToText(xmlChild.textContent, name);
                    }   
                    break;
                case 'value':
                case 'statement':
                    input = block.getInput(name);
                    if (!input) {
                    console.warn('Ignoring non-existent input ' + name + ' in block ' +
                                prototypeName);
                    break;
                    }
                    if (childShadowNode) {
                    input.connection.setShadowDom(childShadowNode);
                    }
                    if (childBlockNode) {
                    blockChild = Blockly.Xml.domToBlockHeadless_(childBlockNode,
                        workspace);
                    if (blockChild.outputConnection) {
                        input.connection.connect(blockChild.outputConnection);
                    } else if (blockChild.previousConnection) {
                        input.connection.connect(blockChild.previousConnection);
                    } else {
                        goog.asserts.fail(
                            'Child block does not have output or previous statement.');
                    }
                    }
                    break;
                case 'next':
                    if (childShadowNode && block.nextConnection) {
                    block.nextConnection.setShadowDom(childShadowNode);
                    }
                    if (childBlockNode) {
                    goog.asserts.assert(block.nextConnection,
                        'Next statement does not exist.');
                    // If there is more than one XML 'next' tag.
                    goog.asserts.assert(!block.nextConnection.isConnected(),
                        'Next statement is already connected.');
                    blockChild = Blockly.Xml.domToBlockHeadless_(childBlockNode,
                        workspace);
                    goog.asserts.assert(blockChild.previousConnection,
                        'Next block does not have previous statement.');
                    block.nextConnection.connect(blockChild.previousConnection);
                    }
                    break;
                default:
                    // Unknown tag; ignore.  Same principle as HTML parsers.
                    console.warn('Ignoring unknown tag: ' + xmlChild.nodeName);
                }
            }

            var inline = xmlBlock.getAttribute('inline');
            if (inline) {
                block.setInputsInline(inline == 'true');
            }
            var disabled = xmlBlock.getAttribute('disabled');
            if (disabled) {
                block.setDisabled(disabled == 'true');
            }
            var deletable = xmlBlock.getAttribute('deletable');
            if (deletable) {
                block.setDeletable(deletable == 'true');
            }
            var movable = xmlBlock.getAttribute('movable');
            if (movable) {
                block.setMovable(movable == 'true');
            }
            var editable = xmlBlock.getAttribute('editable');
            if (editable) {
                block.setEditable(editable == 'true');
            }
            var collapsed = xmlBlock.getAttribute('collapsed');
            if (collapsed) {
                block.setCollapsed(collapsed == 'true');
            }
            if (xmlBlock.nodeName.toLowerCase() == 'shadow') {
                // Ensure all children are also shadows.
                var children = block.getChildren();
                for (var i = 0, child; child = children[i]; i++) {
                goog.asserts.assert(child.isShadow(),
                                    'Shadow block not allowed non-shadow child.');
                }
                block.setShadow(true);
            }
            // Give the block a chance to clean up any initial inputs.
            if (block.validate) {
                block.validate();
            }
            return block;
        };
        
    }
}).call(this);