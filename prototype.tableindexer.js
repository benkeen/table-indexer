/**
 * Table Indexer
 * ~~~~~~~~~~~~~
 *
 * @author  Ben Keen, @vancouverben
 * @version 1.0.0
 * @date    May 3rd 2009
 */
var TableIndexer=Class.create();TableIndexer.prototype={options:{},initialize:function(){var options=Object.extend({formId:null,tableId:null,defaultDir:"horizontal",numCols:null,defaultTabIndex:1},arguments[0]||{});if(options.numCols==null)
{var rows=$$("#"+options.tableId+" tbody tr");var td_nodes=rows[0].getElementsBySelector("td");var th_nodes=rows[0].getElementsBySelector("th");options.numCols=td_nodes.length+th_nodes.length;}
this.options=options;this.setTabIndexDir(this.options.defaultDir);},setTabIndexDir:function(dir)
{var orderedElements=[];if(dir=="horizontal")
{var formElements=$(this.options.formId).getElements();for(var i=0;i<formElements.length;i++)
{if(formElements[i].descendantOf($(this.options.tableId)))
orderedElements.push(formElements[i]);}}
else if(dir=="vertical")
{var rows=$$("#"+this.options.tableId+" tr");var numRows=rows.length;this._currentNodes=[];for(var col=1;col<=this.options.numCols;col++)
{for(var row=0;row<numRows;row++)
{var nodes=rows[row].getElementsBySelector("td");if(!nodes.length)
continue;var node=nodes[col-1];this._getTableFormFieldNodes(node);}}
orderedElements=this._currentNodes;}
var currTabIndex=this.options.defaultTabIndex;orderedElements.each(function(el){el.tabIndex=currTabIndex++;});},_getTableFormFieldNodes:function(n)
{if(n.form&&n.nodeName!="LABEL")
{this._currentNodes.push(n);return;}
var children=n.childNodes;for(var i=0;i<children.length;i++)
{if(children[i].nodeType!=1)
continue;this._getTableFormFieldNodes(children[i]);}}}