import {
	Badge,
	Button,
	Card,
	Group,
	Image,
	Stack,
	Text,
	type BadgeProps,
	type ButtonProps,
	type PolymorphicComponentProps
} from '@mantine/core'

type TileProps = {
	/** Path to the image not including image type */
	image: string
	/** Text at the top */
	title: string
	/** Props of the optional badge inline with the title. Use the text  */
	badge?: PolymorphicComponentProps<'div', BadgeProps> & { text: string }
	/** Optional text under title */
	description?: string
	/** Props of the button at the bottom */
	button: PolymorphicComponentProps<'button', ButtonProps> & { text: string }
}

export default function Tile({ image, title, badge, description = '', button }: TileProps) {
	const { text: badgeText, ...badgeProps } = badge ?? {}
	const { text: buttonText, ...buttonProps } = button

	return (
		<Card>
			<Card.Section>
				<Image src={`${image}.png`} />
			</Card.Section>

			<Card.Section p='md' component={Stack}>
				<Group justify='space-between'>
					<Text fw={500}>{title}</Text>
					{badgeText && <Badge {...badgeProps}>{badgeText}</Badge>}
				</Group>
				<Text>{description}</Text>

				<Button {...buttonProps}>{buttonText}</Button>
			</Card.Section>
		</Card>
	)
}
