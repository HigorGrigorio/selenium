/**
 * @file Metadata.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-04
 *
 * @changelog
 *  - 2024-02-04 - Higor Grigorio
 *    - Create Metadata.ts.
 */

export enum MetadataTypes {
    ParamTypes = 'selenium:paramtypes',
    ParamNames = 'selenium:paramnames',
    ReturnType = 'selenium:returntype',
    PropertyTypes = 'selenium:propertytypes',
    PropertyNames = 'selenium:propertynames',
    TaggedProperty = 'selenium:taggedproperty',
    Tagged = 'selenium:tagged',
    Named = 'selenium:named',
    Inject = 'selenium:inject',
    Identifier = 'selenium:identifier',
}
