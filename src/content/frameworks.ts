import type { FrameworkDef } from '../engine/types';

export const frameworks: FrameworkDef[] = [
  {
    id: 'absorption-refinement',
    name: 'Absorption-Refinement',
    description:
      'The oldest and most primal of cultivation frameworks: consume, digest, refine, ascend. Practitioners of this framework draw vital essence from external sources — defeated enemies, sacred sites, rare materials, or willing donors — and process it through their own spiritual architecture until it becomes indistinguishable from their native power. The framework rewards aggressive acquisition and punishes passivity. Those who do not feed, diminish. Those who feed well, grow without apparent limit. The danger lies in consuming something stronger than oneself, or something that carries a will of its own.',
    tags: ['absorption', 'refinement', 'consumption', 'blood', 'predatory'],
    advancementStyle:
      'Advancement occurs through cycles of consumption and refinement. The cultivator must regularly absorb external essence — whether from defeated foes, blood offerings, or essence-rich environments — and then enter a period of internal refinement where the foreign essence is broken down, purified, and integrated into their core. Each cycle increases capacity and potency, but incomplete refinement leads to essence contamination and spiritual instability.',
    coherenceBonus: ['blood', 'essence', 'consumption'],
  },

  {
    id: 'ritual-accumulation',
    name: 'Ritual Accumulation',
    description:
      'Power built through repetition, ceremony, and the slow accretion of spiritual weight. This framework treats cultivation not as a battle or a feast, but as a liturgy — each performance of the rites adds another layer to the practitioner\'s foundation, like sediment building into stone over geological time. The Ritual Accumulation framework is patient, methodical, and deeply resistant to disruption. What is built slowly is not easily torn down. Practitioners develop an almost geological solidity, their power dense and layered like the strata of an ancient riverbed.',
    tags: ['ritual', 'accumulation', 'death', 'pattern', 'ceremony'],
    advancementStyle:
      'Advancement comes through the faithful performance of rites — funerary ceremonies, cleansing rituals, offerings to the threshold, and meditative communion with the dead. Each rite performed correctly deposits a thin layer of refined essence into the cultivator\'s spiritual foundation. Over time, these layers compress and crystallize, forming a dense core of accumulated power. The framework rewards consistency and punishes deviation; a broken ritual must be performed again from the beginning, and major ceremonial failures can erode months of accumulated progress.',
    coherenceBonus: ['ritual', 'death', 'pattern'],
  },

  {
    id: 'oath-binding',
    name: 'Oath-Binding',
    description:
      'A framework that converts conviction into cultivation. Every vow spoken with true intent carves a channel in the practitioner\'s spiritual architecture, and the act of fulfilling that vow fills the channel with hardened essence that becomes permanent infrastructure. The more oaths kept, the more complex and resilient the internal network becomes. Oath-Binding is unique among frameworks in that it requires no external essence source — the power comes entirely from the cultivator\'s own will, shaped and solidified by the weight of their commitments. It is also unique in its brutality when an oath is broken: the channels collapse, and the cultivator suffers catastrophic internal damage.',
    tags: ['oath', 'binding', 'will', 'commitment', 'iron'],
    advancementStyle:
      'Advancement is achieved by swearing and fulfilling binding oaths. Each oath must be spoken aloud, with full awareness of its terms, and must be achievable but non-trivial. The act of fulfillment hardens the spiritual channels carved by the oath, permanently increasing the cultivator\'s capacity. Greater oaths — those with higher stakes, broader scope, or deeper personal cost — create proportionally larger channels. The framework does not recognize hedged language, conditional promises, or oaths sworn insincerely. An oath broken, even through circumstances beyond the cultivator\'s control, results in channel collapse and severe spiritual damage.',
    coherenceBonus: ['oath', 'will', 'binding'],
  },

  {
    id: 'technical-fabrication',
    name: 'Technical Fabrication',
    description:
      'Cultivation as engineering. This framework approaches spiritual advancement as a construction project, treating the cultivator\'s body and soul as a site upon which increasingly sophisticated structures can be erected. Practitioners design, build, and install internal architectures of refined material — bone, crystal, metal, or other substances capable of channeling essence — creating a bespoke spiritual infrastructure that can be customized, upgraded, and repaired. The framework values precision, planning, and craftsmanship over raw power or spiritual insight.',
    tags: ['fabrication', 'craft', 'structure', 'bone', 'engineering'],
    advancementStyle:
      'Advancement occurs through the design and installation of internal structures. The cultivator must first acquire suitable materials — typically bone, but also refined minerals, spirit-conductive metals, or crystallized essence — then design a component that integrates with their existing architecture, and finally undergo the installation process, which typically involves painful surgical grafting followed by a period of integration. Each successfully installed component increases capacity, efficiency, or both. Failed installations can result in rejection, essence leakage, or structural collapse.',
    coherenceBonus: ['craft', 'bone', 'structure'],
  },

  {
    id: 'void-pilgrimage',
    name: 'Void Pilgrimage',
    description:
      'To walk between is to walk forever. The Void Pilgrimage framework cultivates power not through accumulation or construction, but through passage — the act of crossing thresholds, traversing boundaries, and moving through liminal spaces where the rules of the physical world thin and fray. Each crossing changes the pilgrim, wearing away the solidity of their physical form while deepening their connection to the spaces between. At its deepest levels, the pilgrim becomes a living threshold — a door between worlds that walks on two legs.',
    tags: ['void', 'pilgrimage', 'passage', 'shadow', 'liminal'],
    advancementStyle:
      'Advancement comes through the act of crossing boundaries — literal and metaphorical. Physical thresholds (doorways, borders, the edge between light and shadow), spiritual thresholds (the boundary between life and death, sleep and waking, self and other), and conceptual thresholds (moments of transformation, decisions that cannot be unmade) all contribute to the pilgrim\'s progress. Each crossing thins the barrier between the cultivator and the liminal space, granting deeper access to the shadow-road and greater facility with passage-based techniques. The framework does not reward stillness; a pilgrim who stops moving begins to fade.',
    coherenceBonus: ['shadow', 'void', 'passage'],
  },
];
