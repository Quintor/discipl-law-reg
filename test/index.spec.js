/* eslint-env mocha */
import { expect } from 'chai'
import { LawReg } from '../src/index.js'
import * as log from 'loglevel'

import awb from './flint-example-awb'
import lb from './flint-example-lerarenbeurs'

// Adjusting log level for debugging can be done here, or in specific tests that need more finegrained logging during development
log.getLogger('disciplLawReg').setLevel('warn')

const lawReg = new LawReg()

describe('discipl-law-reg', () => {
  describe('The discipl-law-reg library', () => {
    it('correctly parses and solves a single fact', async () => {
      let parsedFact = lawReg.factParser.parse('[fact1]')

      let core = lawReg.getAbundanceService().getCoreAPI()
      let ssid = await core.newSsid('ephemeral')

      const factResolver = (fact) => {
        return fact === '[fact1]'
      }
      let result = await lawReg.checkExpression(parsedFact, ssid, { 'factResolver': factResolver })

      expect(result).to.equal(true)

      expect(parsedFact).to.deep.equal(
        '[fact1]'
      )
    })

    it('correctly parses and solves a single NOT fact', async () => {
      let parsedFact = lawReg.factParser.parse('NIET [fact1]')
      let core = lawReg.getAbundanceService().getCoreAPI()
      let ssid = await core.newSsid('ephemeral')

      const factResolver = (fact) => {
        return fact === '[fact2]'
      }
      let result = await lawReg.checkExpression(parsedFact, ssid, { 'factResolver': factResolver })

      expect(result).to.equal(true)

      expect(parsedFact).to.deep.equal({
        'expression': 'NOT',
        'operand': '[fact1]'
      })
    })

    it('correctly parses a multiple AND construction', async () => {
      let parsedFact = lawReg.factParser.parse('[fact1] EN [fact2] EN [fact3]')
      let core = lawReg.getAbundanceService().getCoreAPI()
      let ssid = await core.newSsid('ephemeral')

      const factResolver = (fact) => {
        return fact === '[fact1]' || fact === '[fact2]' || fact === '[fact3]'
      }
      let result = await lawReg.checkExpression(parsedFact, ssid, { 'factResolver': factResolver })

      expect(result).to.equal(true)

      expect(parsedFact).to.deep.equal({
        'expression': 'AND',
        'operands': [
          '[fact1]',
          '[fact2]',
          '[fact3]'
        ]
      })
    })

    it('correctly parses a multiple OR construction', async () => {
      let parsedFact = lawReg.factParser.parse('[fact1] OF [fact2] OF [fact3]')
      let core = lawReg.getAbundanceService().getCoreAPI()
      let ssid = await core.newSsid('ephemeral')

      const factResolver = (fact) => {
        return fact === '[fact2]'
      }
      let result = await lawReg.checkExpression(parsedFact, ssid, { 'factResolver': factResolver })

      expect(result).to.equal(true)

      expect(parsedFact).to.deep.equal({
        'expression': 'OR',
        'operands': [
          '[fact1]',
          '[fact2]',
          '[fact3]'
        ]
      })
    })

    it('Does not find a match inside a multiple AND construction', async () => {
      let parsedFact = lawReg.factParser.parse('[fact1] EN [fact2]')
      let core = lawReg.getAbundanceService().getCoreAPI()
      let ssid = await core.newSsid('ephemeral')

      const factResolver = (fact) => {
        return fact === '[fact3]'
      }
      let result = await lawReg.checkExpression(parsedFact, ssid, { 'factResolver': factResolver })

      expect(result).to.equal(false)

      expect(parsedFact).to.deep.equal({
        'expression': 'AND',
        'operands': [
          '[fact1]',
          '[fact2]'
        ]
      })
    })

    it('Does not find a match inside a multiple OR construction', async () => {
      let parsedFact = lawReg.factParser.parse('[fact1] OF [fact2]')
      let core = lawReg.getAbundanceService().getCoreAPI()
      let ssid = await core.newSsid('ephemeral')

      const factResolver = (fact) => {
        return fact === '[fact3]'
      }
      let result = await lawReg.checkExpression(parsedFact, ssid, { 'factResolver': factResolver })

      expect(result).to.equal(false)

      expect(parsedFact).to.deep.equal({
        'expression': 'OR',
        'operands': [
          '[fact1]',
          '[fact2]'
        ]
      })
    })

    it('correctly parses and solves an OR construction with a NOT and AND construction inside', async () => {
      let parsedFact = lawReg.factParser.parse('(NIET [fact1]) OF ([fact2] EN [fact3])')
      let core = lawReg.getAbundanceService().getCoreAPI()
      let ssid = await core.newSsid('ephemeral')

      const factResolver = (fact) => {
        return fact === '[fact]'
      }
      let result = await lawReg.checkExpression(parsedFact, ssid, { 'factResolver': factResolver })

      expect(result).to.equal(true)

      expect(parsedFact).to.deep.equal({
        'expression': 'OR',
        'operands': [
          {
            'expression': 'NOT',
            'operand': '[fact1]'
          },
          {
            'expression': 'AND',
            'operands': [
              '[fact2]',
              '[fact3]'
            ]
          }
        ]
      })
    })

    it('correctly parses and solves an OR construction with two AND constructions and a NOT inside of it', async () => {
      let parsedFact = lawReg.factParser.parse('([fact1] EN [fact2]) OF ([fact3] EN (NIET [fact4]))')
      let core = lawReg.getAbundanceService().getCoreAPI()
      let ssid = await core.newSsid('ephemeral')

      const factResolver = (fact) => {
        return fact === '[fact1]' || fact === '[fact2]'
      }
      let result = await lawReg.checkExpression(parsedFact, ssid, { 'factResolver': factResolver })

      expect(result).to.equal(true)

      expect(parsedFact).to.deep.equal({
        'expression': 'OR',
        'operands': [
          {
            'expression': 'AND',
            'operands': [
              '[fact1]',
              '[fact2]'
            ]
          },
          {
            'expression': 'AND',
            'operands': [
              '[fact3]',
              {
                'expression': 'NOT',
                'operand': '[fact4]'
              }
            ]
          }
        ]
      })
    })

    it('should publish small example', async () => {
      const model = {
        'model': 'Fictieve verwelkomingsregeling Staat der Nederlanden',
        'acts': [
          {
            'act': '<<ingezetene kan verwelkomst van overheid aanvragen>>',
            'action': '[aanvragen]',
            'actor': '[ingezetene]',
            'object': '[verwelkomst]',
            'interested-party': '[overheid]',
            'preconditions': '',
            'create': '<verwelkomen>',
            'terminate': '',
            'reference': 'art 2.1',
            'sourcetext': '',
            'explanation': '',
            'version': '2-[19980101]-[jjjjmmdd]',
            'juriconnect': 'jci1.3:c:BWBR0005537&hoofdstuk=1&titeldeel=1.1&artikel=1:3&lid=3&z=2017-03-01&g=2017-03-01'
          }, {
            'act': '<<fdsafadsf >>',
            'action': '[fdsa]',
            'actor': '[ingezetene]',
            'object': '[verwelkomst]',
            'interested-party': '[overheid]',
            'preconditions': '',
            'create': '<verwelkomen>',
            'terminate': '',
            'reference': 'art 2.1',
            'sourcetext': '',
            'explanation': '',
            'version': '2-[19980101]-[jjjjmmdd]',
            'juriconnect': 'jci1.3:c:BWBR0005537&hoofdstuk=1&titeldeel=1.1&artikel=1:3&lid=3&z=2017-03-01&g=2017-03-01'
          }, {
            'act': '<<fdsafadsf fdas>>',
            'action': '[fdsa fads]',
            'actor': '[ingezetene]',
            'object': '[verwelkomst]',
            'interested-party': '[overheid]',
            'preconditions': '',
            'create': '<verwelkomen>',
            'terminate': '',
            'reference': 'art 2.1',
            'sourcetext': '',
            'explanation': '',
            'version': '2-[19980101]-[jjjjmmdd]',
            'juriconnect': 'jci1.3:c:BWBR0005537&hoofdstuk=1&titeldeel=1.1&artikel=1:3&lid=3&z=2017-03-01&g=2017-03-01'
          }
        ],
        'facts': [
          { 'fact': '[ingezetene]', 'function': '', 'reference': 'art 1.1' },
          { 'fact': '[overheid]', 'function': '[aangesteld als ambtenaar]', 'reference': 'art 1.2' },
          { 'fact': '[betrokkene]', 'function': '[ingezetene] OF [overheid]', 'reference': 'art 1.3' },
          { 'fact': '[klacht]', 'function': '', 'reference': 'art 1.4' },
          { 'fact': '[verwelkomst]', 'function': '', 'reference': 'art 1.5' },
          { 'fact': '[binnen 14 dagen na aanvragen]', 'function': '', 'reference': 'art 2.2' },
          { 'fact': '[na 14 dagen geen verwelkomst]', 'function': '', 'reference': 'art 3.1' }
        ],
        'duties': [
          {
            'duty': '<verwelkomen binnen 14 dagen na aanvragen>',
            'duty-holder': '[overheid]',
            'claimant': '[ingezetene]',
            'create': '<<verwelkomen>>',
            'enforce': '<<klagen>>',
            'terminate': '',
            'reference': 'art 2.2, art 3.1',
            'sourcetext': '',
            'explanation': '',
            'version': '2-[19980101]-[jjjjmmdd]',
            'juriconnect': 'jci1.3:c:BWBR0005537&hoofdstuk=1&titeldeel=1.1&artikel=1:3&lid=3&z=2017-03-01&g=2017-03-01'
          }
        ]
      }

      let abundancesvc = lawReg.getAbundanceService()
      let core = abundancesvc.getCoreAPI()

      let ssid = await core.newSsid('ephemeral')

      let modelLink = await lawReg.publish(ssid, model)

      let modelReference = await core.get(modelLink, ssid)

      let actsLink = modelReference.data['DISCIPL_FLINT_MODEL'].acts[0]['<<ingezetene kan verwelkomst van overheid aanvragen>>']
      let factsLink = modelReference.data['DISCIPL_FLINT_MODEL'].facts[2]['[betrokkene]']
      let dutiesLink = modelReference.data['DISCIPL_FLINT_MODEL'].duties[0]['<verwelkomen binnen 14 dagen na aanvragen>']

      let actReference = await core.get(actsLink, ssid)
      let factReference = await core.get(factsLink, ssid)
      let dutyReference = await core.get(dutiesLink, ssid)

      expect(Object.keys(modelReference.data['DISCIPL_FLINT_MODEL'])).to.have.members(['model', 'acts', 'facts', 'duties'])

      expect(actReference.data['DISCIPL_FLINT_ACT']).to.deep.equal(
        {
          'act': '<<ingezetene kan verwelkomst van overheid aanvragen>>',
          'action': '[aanvragen]',
          'actor': '[ingezetene]',
          'object': '[verwelkomst]',
          'interested-party': '[overheid]',
          'preconditions': '',
          'create': '<verwelkomen>',
          'terminate': '',
          'reference': 'art 2.1',
          'sourcetext': '',
          'explanation': '',
          'version': '2-[19980101]-[jjjjmmdd]',
          'juriconnect': 'jci1.3:c:BWBR0005537&hoofdstuk=1&titeldeel=1.1&artikel=1:3&lid=3&z=2017-03-01&g=2017-03-01'
        }
      )

      expect(factReference.data['DISCIPL_FLINT_FACT']).to.deep.equal(
        { 'fact': '[betrokkene]', 'function': '[ingezetene] OF [overheid]', 'reference': 'art 1.3' }
      )

      expect(dutyReference.data['DISCIPL_FLINT_DUTY']).to.deep.equal({
        'duty': '<verwelkomen binnen 14 dagen na aanvragen>',
        'duty-holder': '[overheid]',
        'claimant': '[ingezetene]',
        'create': '<<verwelkomen>>',
        'enforce': '<<klagen>>',
        'terminate': '',
        'reference': 'art 2.2, art 3.1',
        'sourcetext': '',
        'explanation': '',
        'version': '2-[19980101]-[jjjjmmdd]',
        'juriconnect': 'jci1.3:c:BWBR0005537&hoofdstuk=1&titeldeel=1.1&artikel=1:3&lid=3&z=2017-03-01&g=2017-03-01'
      })

      expect(modelLink).to.be.a('string')
    })

    it('should be able to take an action', async () => {
      let core = lawReg.getAbundanceService().getCoreAPI()

      const model = {
        'model': 'Fictieve verwelkomingsregeling Staat der Nederlanden',
        'acts': [
          {
            'act': '<<ingezetene kan verwelkomst van overheid aanvragen>>',
            'action': '[aanvragen]',
            'actor': '[ingezetene]',
            'object': '[verwelkomst]',
            'interested-party': '[overheid]',
            'preconditions': '[]',
            'create': '<verwelkomen>',
            'terminate': '',
            'reference': 'art 2.1',
            'sourcetext': '',
            'explanation': '',
            'version': '2-[19980101]-[jjjjmmdd]',
            'juriconnect': 'jci1.3:c:BWBR0005537&hoofdstuk=1&titeldeel=1.1&artikel=1:3&lid=3&z=2017-03-01&g=2017-03-01'
          }],
        'facts': [
          { 'fact': '[ingezetene]', 'function': '[]', 'reference': 'art 1.1' }
        ],
        'duties': []
      }

      let lawmakerSsid = await core.newSsid('ephemeral')
      await core.allow(lawmakerSsid)
      let needSsid = await core.newSsid('ephemeral')

      await core.allow(needSsid)

      let actorSsid = await core.newSsid('ephemeral')

      let modelLink = await lawReg.publish(lawmakerSsid, model, {
        '[ingezetene]':
          'IS:' + actorSsid.did
      })

      let retrievedModel = await core.get(modelLink)

      let needLink = await core.claim(needSsid, {
        'need': {
          'act': '<<ingezetene kan verwelkomst van overheid aanvragen>>',
          'DISCIPL_FLINT_MODEL_LINK': modelLink
        }
      })

      let factResolver = (fact) => true

      let actionLink = await lawReg.take(actorSsid, needLink, '<<ingezetene kan verwelkomst van overheid aanvragen>>', factResolver)

      let action = await core.get(actionLink, actorSsid)

      expect(action).to.deep.equal({
        'data': {
          'DISCIPL_FLINT_ACT_TAKEN': Object.values(retrievedModel.data['DISCIPL_FLINT_MODEL'].acts[0])[0],
          'DISCIPL_FLINT_GLOBAL_CASE': needLink,
          'DISCIPL_FLINT_PREVIOUS_CASE': needLink
        },
        'previous': null
      })
    })

    it('should be able to take an action dependent on recursive facts', async () => {
      let core = lawReg.getAbundanceService().getCoreAPI()

      let lawmakerSsid = await core.newSsid('ephemeral')
      await core.allow(lawmakerSsid)

      let actorSsid = await core.newSsid('ephemeral')

      let modelLink = await lawReg.publish(lawmakerSsid, { ...awb, 'model': 'AWB' }, {
        '[persoon wiens belang rechtstreeks bij een besluit is betrokken]':
          'IS:' + actorSsid.did
      })

      let retrievedModel = await core.get(modelLink)

      let needSsid = await core.newSsid('ephemeral')

      await core.allow(needSsid)
      let needLink = await core.claim(needSsid, {
        'need': {
          'act': '<<indienen verzoek een besluit te nemen>>',
          'DISCIPL_FLINT_MODEL_LINK': modelLink
        }
      })

      let factResolver = (fact) => {
        if (typeof fact === 'string') {
          return fact === '[verzoek een besluit te nemen]' ||
            fact === '[wetgevende macht]'
        }
        return false
      }

      let actionLink = await lawReg.take(actorSsid, needLink, '<<indienen verzoek een besluit te nemen>>', factResolver)

      let action = await core.get(actionLink, actorSsid)

      expect(action).to.deep.equal({
        'data': {
          'DISCIPL_FLINT_ACT_TAKEN': Object.values(retrievedModel.data['DISCIPL_FLINT_MODEL'].acts[0])[0],
          'DISCIPL_FLINT_GLOBAL_CASE': needLink,
          'DISCIPL_FLINT_PREVIOUS_CASE': needLink
        },
        'previous': null
      })
    })

    it('should be able to take an action where the object originates from another action - AWB', async () => {
      let core = lawReg.getAbundanceService().getCoreAPI()

      let lawmakerSsid = await core.newSsid('ephemeral')
      await core.allow(lawmakerSsid)

      let belanghebbendeSsid = await core.newSsid('ephemeral')
      await core.allow(belanghebbendeSsid)
      let bestuursorgaanSsid = await core.newSsid('ephemeral')
      await core.allow(bestuursorgaanSsid)

      let modelLink = await lawReg.publish(lawmakerSsid, { ...awb, 'model': 'AWB' }, {
        '[persoon wiens belang rechtstreeks bij een besluit is betrokken]':
          'IS:' + belanghebbendeSsid.did,
        '[wetgevende macht]':
          'IS:' + bestuursorgaanSsid.did
      })

      let retrievedModel = await core.get(modelLink)

      let needSsid = await core.newSsid('ephemeral')

      await core.allow(needSsid)
      let needLink = await core.claim(needSsid, {
        'need': {
          'act': '<<indienen verzoek een besluit te nemen>>',
          'DISCIPL_FLINT_MODEL_LINK': modelLink
        }
      })

      let belanghebbendeFactresolver = (fact) => {
        if (typeof fact === 'string') {
          return fact === '[verzoek een besluit te nemen]'
        }
        return false
      }

      let actionLink = await lawReg.take(belanghebbendeSsid, needLink, '<<indienen verzoek een besluit te nemen>>', belanghebbendeFactresolver)

      let bestuursorgaanFactresolver = (fact) => {
        if (typeof fact === 'string') {
          // interested party
          return fact === '[persoon wiens belang rechtstreeks bij een besluit is betrokken]' ||
            // preconditions
            fact === '[aanvraag is geheel of gedeeltelijk geweigerd op grond van artikel 2:15 Awb]'
        }
        return false
      }

      let secondActionLink = await lawReg.take(bestuursorgaanSsid, actionLink, '<<besluiten de aanvraag niet te behandelen>>', bestuursorgaanFactresolver)

      expect(secondActionLink).to.be.a('string')

      let action = await core.get(secondActionLink, bestuursorgaanSsid)

      const expectedActLink = retrievedModel.data['DISCIPL_FLINT_MODEL'].acts
        .filter(item => Object.keys(item).includes('<<besluiten de aanvraag niet te behandelen>>'))

      expect(action.data).to.deep.equal({
        'DISCIPL_FLINT_ACT_TAKEN': Object.values(expectedActLink[0])[0],
        'DISCIPL_FLINT_GLOBAL_CASE': needLink,
        'DISCIPL_FLINT_PREVIOUS_CASE': actionLink
      })
    })

    it('should be able to take an action where the object originates from another action - LERARENBEURS', async () => {
      let core = lawReg.getAbundanceService().getCoreAPI()

      let lawmakerSsid = await core.newSsid('ephemeral')
      await core.allow(lawmakerSsid)

      let belanghebbendeSsid = await core.newSsid('ephemeral')
      await core.allow(belanghebbendeSsid)
      let bestuursorgaanSsid = await core.newSsid('ephemeral')
      await core.allow(bestuursorgaanSsid)

      let modelLink = await lawReg.publish(lawmakerSsid, { ...lb, 'model': 'LB' }, {
        '[persoon wiens belang rechtstreeks bij een besluit is betrokken]':
          'IS:' + belanghebbendeSsid.did,
        '[orgaan]':
          'IS:' + bestuursorgaanSsid.did,
        '[rechtspersoon die krachtens publiekrecht is ingesteld]':
          'IS:' + bestuursorgaanSsid.did
      })

      let retrievedModel = await core.get(modelLink)

      let needSsid = await core.newSsid('ephemeral')

      await core.allow(needSsid)
      let needLink = await core.claim(needSsid, {
        'need': {
          'act': '<<indienen verzoek een besluit te nemen>>',
          'DISCIPL_FLINT_MODEL_LINK': modelLink
        }
      })

      let belanghebbendeFactresolver = (fact) => {
        if (typeof fact === 'string') {
          return fact === '[verzoek een besluit te nemen]'
        }
        return false
      }

      let actionLink = await lawReg.take(belanghebbendeSsid, needLink, '<<indienen verzoek een besluit te nemen>>', belanghebbendeFactresolver)

      let bestuursorgaanFactresolver = (fact) => {
        if (typeof fact === 'string') {
          return fact === '[persoon wiens belang rechtstreeks bij een besluit is betrokken]' ||
            fact === '[aanvrager heeft de gelegenheid gehad de aanvraag aan te vullen]' ||
            fact === '[besluit om de aanvraag niet te behandelen wordt aan de aanvrager bekendgemaakt binnen vier weken nadat de aanvraag is aangevuld of nadat de daarvoor gestelde termijn ongebruikt is verstreken]'
        }
        return false
      }

      let secondActionLink = await lawReg.take(bestuursorgaanSsid, actionLink, '<<besluiten de aanvraag niet te behandelen>>', bestuursorgaanFactresolver)

      expect(secondActionLink).to.be.a('string')

      let action = await core.get(secondActionLink, bestuursorgaanSsid)

      const expectedActLink = retrievedModel.data['DISCIPL_FLINT_MODEL'].acts
        .filter(item => Object.keys(item).includes('<<besluiten de aanvraag niet te behandelen>>'))

      expect(action.data).to.deep.equal({
        'DISCIPL_FLINT_ACT_TAKEN': Object.values(expectedActLink[0])[0],
        'DISCIPL_FLINT_GLOBAL_CASE': needLink,
        'DISCIPL_FLINT_PREVIOUS_CASE': actionLink
      })
    }).timeout(5000)

    it('should be able to determine available actions', async () => {
      let core = lawReg.getAbundanceService().getCoreAPI()

      let lawmakerSsid = await core.newSsid('ephemeral')
      await core.allow(lawmakerSsid)

      let belanghebbendeSsid = await core.newSsid('ephemeral')
      await core.allow(belanghebbendeSsid)
      let bestuursorgaanSsid = await core.newSsid('ephemeral')
      await core.allow(bestuursorgaanSsid)

      let modelLink = await lawReg.publish(lawmakerSsid, { ...lb, 'model': 'LB' }, {
        '[persoon wiens belang rechtstreeks bij een besluit is betrokken]':
          'IS:' + belanghebbendeSsid.did,
        '[orgaan]':
          'IS:' + bestuursorgaanSsid.did,
        '[rechtspersoon die krachtens publiekrecht is ingesteld]':
          'IS:' + bestuursorgaanSsid.did
      })

      let needSsid = await core.newSsid('ephemeral')

      await core.allow(needSsid)
      let needLink = await core.claim(needSsid, {
        'need': {
          'act': '<<indienen verzoek een besluit te nemen>>',
          'DISCIPL_FLINT_MODEL_LINK': modelLink
        }
      })

      let allowedActs = await lawReg.getAvailableActs(needLink, belanghebbendeSsid, ['[verzoek een besluit te nemen]'])

      expect(allowedActs).to.deep.equal(['<<indienen verzoek een besluit te nemen>>'])
    }).timeout(5000)

    it('should be able to determine potentially available actions', async () => {
      let core = lawReg.getAbundanceService().getCoreAPI()

      let lawmakerSsid = await core.newSsid('ephemeral')
      await core.allow(lawmakerSsid)

      let belanghebbendeSsid = await core.newSsid('ephemeral')
      await core.allow(belanghebbendeSsid)
      let bestuursorgaanSsid = await core.newSsid('ephemeral')
      await core.allow(bestuursorgaanSsid)

      let modelLink = await lawReg.publish(lawmakerSsid, { ...lb, 'model': 'LB' }, {
        '[persoon wiens belang rechtstreeks bij een besluit is betrokken]': 'IS:' + belanghebbendeSsid.did,
        '[leraar]': 'IS:' + belanghebbendeSsid.did,
        '[orgaan]': 'IS:' + bestuursorgaanSsid.did,
        '[rechtspersoon die krachtens publiekrecht is ingesteld]': 'IS:' + bestuursorgaanSsid.did,
        '[met enig openbaar gezag bekleed]': 'IS:' + bestuursorgaanSsid.did,
        '[bevoegd gezag]': 'IS:' + bestuursorgaanSsid.did,
        '[minister van Onderwijs, Cultuur en Wetenschap]': 'IS:' + bestuursorgaanSsid.did,
        '[persoon]': 'ANYONE'
      })

      let needSsid = await core.newSsid('ephemeral')

      await core.allow(needSsid)
      let needLink = await core.claim(needSsid, {
        'need': {
          'act': '<<indienen verzoek een besluit te nemen>>',
          'DISCIPL_FLINT_MODEL_LINK': modelLink
        }
      })

      let allowedActs = await lawReg.getPotentialActs(needLink, belanghebbendeSsid, [])

      expect(allowedActs).to.deep.equal([
        '<<indienen verzoek een besluit te nemen>>',
        '<<leraar vraagt subsidie voor studiekosten aan>>',
        '<<leraar vraagt subsidie voor studieverlof voor het bevoegd gezag>>',
        '<<leraar overlegt bewijsstuk waaruit blijkt dat hij ten minste vijftien studiepunten heeft gehaald>>',
        '<<leraar overlegt bewijsstuk waaruit blijkt dat hij collegegeld heeft betaald>>',
        '<<inleveren of verzenden ingevulde aanvraagformulier lerarenbeurs>>'
      ])
    }).timeout(10000)

    it('should be able to fill functions of single and multiple facts', async () => {
      let core = lawReg.getAbundanceService().getCoreAPI()
      let ssid = await core.newSsid('ephemeral')

      let model = {
        'acts': [],
        'facts': [
          {
            'explanation': '',
            'fact': '[belanghebbende]',
            'function': '[persoon wiens belang rechtstreeks bij een besluit is betrokken]',
            'reference': 'art. 1:2 lid 1 Awb',
            'version': '2-[19940101]-[jjjjmmdd]',
            'juriconnect': 'jci1.3:c:BWBR0005537&hoofdstuk=1&titeldeel=1.1&artikel=1:2&lid=1&z=2017-03-10&g=2017-03-10',
            'sourcetext': '{Onder belanghebbende wordt verstaan: degene wiens belang rechtstreeks bij een besluit is betrokken}'
          },
          {
            'explanation': '',
            'fact': '[toezending besluit aan aanvrager]',
            'function': '[]',
            'reference': 'art 3:41 lid 1 Awb',
            'version': '',
            'juriconnect': '',
            'sourcetext': ''
          },
          {
            'explanation': '',
            'fact': '[toezending besluit aan meer belanghebbenden]',
            'function': '[]',
            'reference': 'art 3:41 lid 1 Awb',
            'version': '',
            'juriconnect': '',
            'sourcetext': ''
          },
          {
            'explanation': '',
            'fact': '[uitreiking besluit aan aanvrager]',
            'function': '[]',
            'reference': 'art 3:41 lid 1 Awb',
            'version': '',
            'juriconnect': '',
            'sourcetext': ''
          },
          {
            'explanation': '',
            'fact': '[uitreiking besluit aan meer belanghebbenden]',
            'function': '[]',
            'reference': 'art 3:41 lid 1 Awb',
            'version': '',
            'juriconnect': '',
            'sourcetext': ''
          }
        ],
        'duties': []
      }

      let modelLink = await lawReg.publish(ssid, { ...model, 'model': 'AWB' }, {
        '[uitreiking besluit aan aanvrager]':
          'IS:did:discipl:ephemeral:1234',
        '[toezending besluit aan aanvrager]':
          'IS:did:discipl:ephemeral:1234'
      })

      let retrievedModel = await core.get(modelLink, ssid)

      let retrievedFact = await core.get(retrievedModel.data['DISCIPL_FLINT_MODEL'].facts[3]['[uitreiking besluit aan aanvrager]'], ssid)

      retrievedFact = retrievedFact.data['DISCIPL_FLINT_FACT'].function
      expect(retrievedFact).to.deep.equal('IS:did:discipl:ephemeral:1234')

      let retrievedSecondFact = await core.get(retrievedModel.data['DISCIPL_FLINT_MODEL'].facts[1]['[toezending besluit aan aanvrager]'], ssid)
      retrievedSecondFact = retrievedSecondFact.data['DISCIPL_FLINT_FACT'].function
      expect(retrievedSecondFact).to.deep.equal('IS:did:discipl:ephemeral:1234')
    })

    it('should perform a checkAction', async () => {
      let core = lawReg.getAbundanceService().getCoreAPI()

      let model = {
        'acts': [{
          'act': '<<ingezetene kan verwelkomst van overheid aanvragen>>',
          'action': '[aanvragen]',
          'actor': '[aanvrager]',
          'object': '[verwelkomst]',
          'interested-party': '[overheid]',
          'preconditions': '[]',
          'create': '<verwelkomen>',
          'terminate': '',
          'reference': 'art 2.1',
          'sourcetext': '',
          'explanation': '',
          'version': '2-[19980101]-[jjjjmmdd]',
          'juriconnect': 'jci1.3:c:BWBR0005537&hoofdstuk=1&titeldeel=1.1&artikel=1:3&lid=3&z=2017-03-01&g=2017-03-01'
        }],
        'facts': [{
          'explanation': '',
          'fact': '[belanghebbende]',
          'function': '[persoon wiens belang rechtstreeks bij een besluit is betrokken]',
          'reference': 'art. 1:2 lid 1 Awb',
          'version': '2-[19940101]-[jjjjmmdd]',
          'juriconnect': 'jci1.3:c:BWBR0005537&hoofdstuk=1&titeldeel=1.1&artikel=1:2&lid=1&z=2017-03-10&g=2017-03-10',
          'sourcetext': '{Onder belanghebbende wordt verstaan: degene wiens belang rechtstreeks bij een besluit is betrokken}'
        }, {
          'explanation': '',
          'fact': '[aanvrager]',
          'function': '[]',
          'reference': 'art 3:41 lid 1 Awb',
          'version': '',
          'juriconnect': '',
          'sourcetext': ''
        }, {
          'explanation': '',
          'fact': '[toezending besluit aan aanvrager]',
          'function': '[]',
          'reference': 'art 3:41 lid 1 Awb',
          'version': '',
          'juriconnect': '',
          'sourcetext': ''
        }, {
          'explanation': '',
          'fact': '[toezending besluit aan meer belanghebbenden]',
          'function': '[]',
          'reference': 'art 3:41 lid 1 Awb',
          'version': '',
          'juriconnect': '',
          'sourcetext': ''
        }, {
          'explanation': '',
          'fact': '[uitreiking besluit aan aanvrager]',
          'function': '[]',
          'reference': 'art 3:41 lid 1 Awb',
          'version': '',
          'juriconnect': '',
          'sourcetext': ''
        }, {
          'explanation': '',
          'fact': '[uitreiking besluit aan meer belanghebbenden]',
          'function': '[]',
          'reference': 'art 3:41 lid 1 Awb',
          'version': '',
          'juriconnect': '',
          'sourcetext': ''
        }],
        'duties': []
      }

      let ssid = await core.newSsid('ephemeral')
      let modelLink = await lawReg.publish(ssid, model, {
        '[aanvrager]':
          'IS:' + ssid.did
      })
      let modelRef = await core.get(modelLink, ssid)

      let actsLink = modelRef.data['DISCIPL_FLINT_MODEL'].acts[0]['<<ingezetene kan verwelkomst van overheid aanvragen>>']

      const factResolver = (fact) => {
        return true
      }

      let result = await lawReg.checkAction(modelLink, actsLink, ssid, { 'factResolver': factResolver })

      expect(result).to.equal(true)
    })

    it('should perform multiple acts for a happy flow in the context of Lerarenbeurs', async () => {
      let core = lawReg.getAbundanceService().getCoreAPI()

      let lawmakerSsid = await core.newSsid('ephemeral')
      await core.allow(lawmakerSsid)

      let belanghebbendeSsid = await core.newSsid('ephemeral')
      await core.allow(belanghebbendeSsid)
      let bestuursorgaanSsid = await core.newSsid('ephemeral')
      await core.allow(bestuursorgaanSsid)

      let modelLink = await lawReg.publish(lawmakerSsid, { ...lb, 'model': 'LB' }, {
        '[leraar]': 'IS:' + belanghebbendeSsid.did,
        '[minister van Onderwijs, Cultuur en Wetenschap]': 'IS:' + bestuursorgaanSsid.did
      })

      let retrievedModel = await core.get(modelLink)
      let needSsid = await core.newSsid('ephemeral')

      await core.allow(needSsid)
      let needLink = await core.claim(needSsid, {
        'need': {
          'act': '<<leraar vraagt subsidie voor studiekosten aan>>',
          'DISCIPL_FLINT_MODEL_LINK': modelLink
        }
      })

      let belanghebbendeFactresolver = (fact) => {
        if (typeof fact === 'string') {
          return fact === '[subsidie voor studiekosten]' ||
            fact === '[ingevulde aanvraagformulier op de website van de Dienst Uitvoering Onderwijs]'
        }
        return false
      }

      let actionLink = await lawReg.take(belanghebbendeSsid, needLink, '<<leraar vraagt subsidie voor studiekosten aan>>', belanghebbendeFactresolver)

      let bestuursorgaanFactresolver = (fact) => {
        if (typeof fact === 'string') {
          return fact === '[subsidie lerarenbeurs]' ||
            fact === '[subsidie voor bacheloropleiding leraar]' ||
            fact === '[leraar voldoet aan bevoegdheidseisen]' ||
            fact === '[leraar voldoet aan de subsidiecriteria]' ||
            fact === '[leraar werkt bij een of meer bekostigde onderwijsinstellingen]' ||
            fact === '[leraar die bij aanvang van het studiejaar waarvoor de subsidie bestemd de graad Bachelor mag voeren]' ||
            fact === '[leraar die op het moment van de subsidieaanvraag in dienst is bij een werkgever]' ||
            fact === '[leraar werkt bij een of meer bekostigde onderwijsinstellingen]' ||
            fact === '[leraar die voor minimaal twintig procent van zijn werktijd is belast met lesgebonden taken]' ||
            fact === '[leraar die pedagogisch-didactisch verantwoordelijk is voor het onderwijs]' ||
            fact === '[leraar die ingeschreven staat in registerleraar.nl]' ||
            fact === '[subsidie wordt verstrekt voor één studiejaar en voor één opleiding]' ||
            fact === '[minister verdeelt het beschikbare bedrag per doelgroep over de aanvragen]'
        }
        return false
      }

      let secondActionLink = await lawReg.take(bestuursorgaanSsid, actionLink, '<<minister verstrekt subsidie lerarenbeurs aan leraar>>', bestuursorgaanFactresolver)

      expect(secondActionLink).to.be.a('string')

      let action = await core.get(secondActionLink, bestuursorgaanSsid)

      const expectedActLink = retrievedModel.data['DISCIPL_FLINT_MODEL'].acts
        .filter(item => Object.keys(item).includes('<<minister verstrekt subsidie lerarenbeurs aan leraar>>'))

      expect(action.data).to.deep.equal({
        'DISCIPL_FLINT_ACT_TAKEN': Object.values(expectedActLink[0])[0],
        'DISCIPL_FLINT_GLOBAL_CASE': needLink,
        'DISCIPL_FLINT_PREVIOUS_CASE': actionLink
      })
    }).timeout(5000)
  })
})
