import {ImportsType} from '@/types/imports'
import {NodePath} from 'babel__traverse'
import {ImportDeclaration, isImportSpecifier, isIdentifier} from '@babel/types'

export default function (code: string, {imports}: {imports: ImportsType}) {
	return {
		name: 'get-imports',
		visitor: {
			ImportDeclaration(path: NodePath<ImportDeclaration>) {
				imports.push({
					variables: path.node.specifiers.map((spec) => {
						if (isImportSpecifier(spec) && isIdentifier(spec.imported)) {
							return {
								local: spec.local.name,
								imported: spec.imported ? spec.imported.name : 'default',
							}
						} else {
							return {
								local: '',
								imported: '',
							}
						}
					}),
					module: path.node.source.value,
				})
				path.remove()
			},
		},
	}
}
