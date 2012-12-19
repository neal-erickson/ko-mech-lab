<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/ItemStats">
		<html>
			<body>
				<textarea style="width:100%;height:1200px;">
					<itemStats>
						<mechs>
							<xsl:for-each select="MechList/Mech">
								<mech>
									<id><xsl:value-of select="@id" /></id>
									<name><xsl:value-of select="@name" /></name>
									<mdf><xsl:value-of select="@mdf" /></mdf>
								</mech>
							</xsl:for-each>
						</mechs>
						<weapons>
							<xsl:for-each select="WeaponList/Weapon">
								<weapon>
									<id><xsl:value-of select="@id" /></id>
									<name><xsl:value-of select="@name" /></name>
									<weaponStats>
										<health><xsl:value-of select="WeaponStats/@Health" /></health>
										<slots><xsl:value-of select="WeaponStats/@slots" /></slots>
										<type><xsl:value-of select="WeaponStats/@type" /></type>
										<projectileclass><xsl:value-of select="WeaponStats/@projectileclass" /></projectileclass>
										<numFiring><xsl:value-of select="WeaponStats/@numFiring" /></numFiring>
										<damage><xsl:value-of select="WeaponStats/@damage" /></damage>
										<heatdamage><xsl:value-of select="WeaponStats/@heatdamage" /></heatdamage>
										<impulse><xsl:value-of select="WeaponStats/@impulse" /></impulse>
										<heat><xsl:value-of select="WeaponStats/@heat" /></heat>
										<cooldown><xsl:value-of select="WeaponStats/@cooldown" /></cooldown>
										<ammoType><xsl:value-of select="WeaponStats/@ammoType" /></ammoType>
										<ammoPerShot><xsl:value-of select="WeaponStats/@ammoPerShot" /></ammoPerShot>
										<minRange><xsl:value-of select="WeaponStats/@minRange" /></minRange>
										<longRange><xsl:value-of select="WeaponStats/@longRange" /></longRange>
										<maxRange><xsl:value-of select="WeaponStats/@maxRange" /></maxRange>
										<duration><xsl:value-of select="WeaponStats/@duration" /></duration>
										<lifetime><xsl:value-of select="WeaponStats/@lifetime" /></lifetime>
										<speed><xsl:value-of select="WeaponStats/@speed" /></speed>
										<volleydelay><xsl:value-of select="WeaponStats/@volleydelay" /></volleydelay>
										<gravity><xsl:value-of select="WeaponStats/@gravity" /></gravity>
										<maxDepth><xsl:value-of select="WeaponStats/@maxDepth" /></maxDepth>
									</weaponStats>
								</weapon>
								
							</xsl:for-each>
						</weapons>
						<ammoTypes>
							<xsl:for-each select="AmmoTypeList/AmmoType">
								<ammoType>
									<id><xsl:value-of select="@id" /></id>
									<name><xsl:value-of select="@name" /></name>
									<ammoTypeStats>
										<type><xsl:value-of select="AmmoTypeStats/@type" /></type>
										<internalDamage><xsl:value-of select="AmmoTypeStats/@internalDamage" /></internalDamage>
										<shotsPerTon><xsl:value-of select="AmmoTypeStats/@shotsPerTon" /></shotsPerTon>
										<health><xsl:value-of select="AmmoTypeStats/@health" /></health>
									</ammoTypeStats>
								</ammoType>
							</xsl:for-each>
						</ammoTypes>
					</itemStats>
				</textarea>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>