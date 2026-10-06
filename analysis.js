// UI consumes measured Python results only. No synthesized geometry or scores.
const dataset=window.GLYPH_ANALYSIS;
if(!dataset)throw new Error('Run topology_solver.py to generate results/analysis-data.js');
const surnames=dataset.surnames;
class GeometryAnalyzer { analyze(surname){return surname.candidates;} }
function recommend(candidates,balance){
 const fidelityFloor=99.8-Math.max(0,Math.min(100,balance))*.043;
 const eligible=candidates.filter(c=>c.valid && c.metrics.iou*100+1e-9>=fidelityFloor && c.metrics.widthConstraint && c.metrics.thinInkFraction<=.02);
 eligible.sort((a,b)=>a.loops-b.loops || b.metrics.iou-a.metrics.iou || a.budget-b.budget);
 return {fidelityFloor,candidate:eligible[0]||null};
}
