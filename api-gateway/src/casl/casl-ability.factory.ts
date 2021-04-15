import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Admin, Customer, GeneralUser } from 'src/shared/classes/index';
import { Action } from 'src/shared/enum/actions.enum';

type Subjects = InferSubjects<typeof Customer | typeof Admin> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: GeneralUser) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.isAdmin) {
      can(Action.Manage, 'all'); // read-write access to everything
    } else if (user.isCustomer) {
      can(Action.Read, 'all'); // read-only access to everything
      can(Action.Update, Customer, { id: user.id }); // Có thể update tài khoản của chính họ
    } else if (user.isMerchant) {
    } else if (user.isDeliver) {
    }

    // cannot(Action.Delete, Article, { isPublished: true });

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
