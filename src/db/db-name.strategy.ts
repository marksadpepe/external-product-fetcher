import { DefaultNamingStrategy } from 'typeorm';

export class DbNameStrategy extends DefaultNamingStrategy {
  tableName(targetName: string, userSpecifiedName?: string): string {
    return super
      .tableName(targetName, userSpecifiedName)
      .replace(/_entity$/, '');
  }
}
