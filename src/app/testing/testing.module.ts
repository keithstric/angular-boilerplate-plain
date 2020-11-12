import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreModule} from '@core/core.module';
import {LayoutModule} from '@layout/layout.module';
import {
	MockCardComponent,
	MockPageBreadcrumbHeaderComponent,
	MockPageNotFoundComponent,
	MockSiteHeaderComponent,
	MockStorybookOpenDialogComponent,
	MockStorybookPageBreadcrumbHeaderComponent,
	MockStorybookUserAvatarComponent,
	MockStorybookDialogContentComponent
} from 'src/app/testing/mock-components';

const components = [
	MockCardComponent,
	MockStorybookOpenDialogComponent,
	MockStorybookPageBreadcrumbHeaderComponent,
	MockPageBreadcrumbHeaderComponent,
	MockPageNotFoundComponent,
	MockSiteHeaderComponent,
	MockStorybookUserAvatarComponent,
	MockStorybookDialogContentComponent
];

@NgModule({
	declarations: [
		...components
	],
	imports: [
		CommonModule,
		LayoutModule,
		CoreModule
	],
	exports: [
		...components
	]
})
export class TestingModule {
}
