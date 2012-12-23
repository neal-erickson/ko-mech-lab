<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/ItemStats">
		<html>
			<body>
				<textarea style="width:100%;height:600px;">
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
									<slots><xsl:value-of select="WeaponStats/@slots" /></slots>
									<tons><xsl:value-of select="WeaponStats/@tons" /></tons>
									<weaponStats>
										<health><xsl:value-of select="WeaponStats/@Health" /></health>
										<slots><xsl:value-of select="WeaponStats/@slots" /></slots>
										<type><xsl:value-of select="WeaponStats/@type" /></type>
										<tons><xsl:value-of select="WeaponStats/@tons" /></tons>
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
									<tons>1</tons>
									<ammoTypeStats>
										<type><xsl:value-of select="AmmoTypeStats/@type" /></type>
										<internalDamage><xsl:value-of select="AmmoTypeStats/@internalDamage" /></internalDamage>
										<shotsPerTon><xsl:value-of select="AmmoTypeStats/@shotsPerTon" /></shotsPerTon>
										<health><xsl:value-of select="AmmoTypeStats/@health" /></health>
									</ammoTypeStats>
								</ammoType>
							</xsl:for-each>
						</ammoTypes>
						<modules>
							<xsl:for-each select="ModuleList/Module[@CType!='CCockpitItemStats']">
								<module>
									<id><xsl:value-of select="@id" /></id>
									<name><xsl:value-of select="@name" /></name>
									<slots><xsl:value-of select="ModuleStats/@slots" /></slots>
									<tons><xsl:value-of select="ModuleStats/@tons" /></tons>
									<cType><xsl:value-of select="@CType" /></cType>
									<moduleStats>
										<slots><xsl:value-of select="ModuleStats/@slots" /></slots>
										<tons><xsl:value-of select="ModuleStats/@tons" /></tons>
										<health><xsl:value-of select="ModuleStats/@health" /></health>
									</moduleStats>
									<xsl:if test="JumpJetStats">
										<jumpJetStats>
											<cooldown><xsl:value-of select="JumpJetStats/@cooldown" /></cooldown>
											<duration><xsl:value-of select="JumpJetStats/@duration" /></duration>
											<boost_fwd><xsl:value-of select="JumpJetStats/@boost_fwd" /></boost_fwd>
											<boost_z><xsl:value-of select="JumpJetStats/@boost_z" /></boost_z>
											<heat><xsl:value-of select="JumpJetStats/@heat" /></heat>
											<minTons><xsl:value-of select="JumpJetStats/@minTons" /></minTons>
											<maxTons><xsl:value-of select="JumpJetStats/@maxTons" /></maxTons>
										</jumpJetStats>
									</xsl:if>
									<xsl:if test="HeatSinkStats">
										<heatSinkStats>
											<cooling><xsl:value-of select="HeatSinkStats/@cooling" /></cooling>
											<heatbase><xsl:value-of select="HeatSinkStats/@heatbase" /></heatbase>
										</heatSinkStats>
									</xsl:if>
									<xsl:if test="EngineStats">
										<engineStats>
											<slots><xsl:value-of select="EngineStats/@slots" /></slots>
											<rating><xsl:value-of select="EngineStats/@rating" /></rating>
											<weight><xsl:value-of select="EngineStats/@weight" /></weight>
											<type><xsl:value-of select="EngineStats/@type" /></type>
											<heatsinks><xsl:value-of select="EngineStats/@heatsinks" /></heatsinks>
											<health><xsl:value-of select="EngineStats/@health" /></health>
										</engineStats>
									</xsl:if>
									<xsl:if test="ArtemisStats">
										<artemisStats>
											<lockTime><xsl:value-of select="ArtemisStats/@lockTime" /></lockTime>
											<trackingStrength><xsl:value-of select="ArtemisStats/@trackingStrength" /></trackingStrength>
											<missileSpread><xsl:value-of select="ArtemisStats/@missileSpread" /></missileSpread>
										</artemisStats>
									</xsl:if>
									<xsl:if test="PilotModuleStats">
										<pilotModuleStats>
											<talentid><xsl:value-of select="PilotModuleStats/@talentid" /></talentid>
										</pilotModuleStats>
									</xsl:if>
								</module>
							</xsl:for-each>
						</modules>
					</itemStats>
				</textarea>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>