import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreModule} from '@core/core.module';
import {LayoutModule} from '@layout/layout.module';
import {SharedModule} from '@shared/shared.module';
import {
	MockCardComponent,
	MockPageBreadcrumbHeaderComponent,
	MockPageNotFoundComponent,
	MockSiteHeaderComponent,
	MockStorybookPageBreadcrumbHeaderComponent,
	MockStorybookUserAvatarComponent,
	MockStorybookDialogContentComponent, MockStorybookNoUserAvatarComponent
} from 'src/app/testing/mock-components';

const components = [
	MockCardComponent,
	MockStorybookPageBreadcrumbHeaderComponent,
	MockPageBreadcrumbHeaderComponent,
	MockPageNotFoundComponent,
	MockSiteHeaderComponent,
	MockStorybookUserAvatarComponent,
	MockStorybookNoUserAvatarComponent,
	MockStorybookDialogContentComponent
];

@NgModule({
	declarations: [
		...components
	],
	imports: [
		CommonModule,
		LayoutModule,
		CoreModule,
		SharedModule
	],
	exports: [
		...components
	]
})
export class TestingModule {
}
