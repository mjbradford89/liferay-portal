/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

package com.liferay.portal.language;

import com.liferay.portal.kernel.test.CodeCoverageAssertor;
import com.liferay.portal.kernel.util.ReflectionUtil;

import java.lang.reflect.Method;

import java.util.Arrays;
import java.util.Collections;
import java.util.Enumeration;
import java.util.LinkedHashSet;
import java.util.NoSuchElementException;
import java.util.Set;

import org.junit.Assert;
import org.junit.ClassRule;
import org.junit.Test;

/**
 * @author Shuyang Zhou
 */
public class ResourceBundleEnumerationTest {

	@ClassRule
	public static CodeCoverageAssertor codeCoverageAssertor =
		new CodeCoverageAssertor();

	@Test
	public void testWithEnumeration() throws Exception {
		Set<String> set = new LinkedHashSet<String>(
			Arrays.asList("key1", "key2"));
		Enumeration<String> enumeration = Collections.enumeration(
			Arrays.asList("key2", "key3"));

		ResourceBundleEnumeration resourceBundleEnumeration =
			new ResourceBundleEnumeration(set, enumeration);

		Assert.assertTrue(resourceBundleEnumeration.hasMoreElements());
		Assert.assertEquals("key1", resourceBundleEnumeration.nextElement());

		Method nextElementMethod = ReflectionUtil.getBridgeMethod(
			ResourceBundleEnumeration.class, "nextElement");

		Assert.assertEquals(
			"key2", nextElementMethod.invoke(resourceBundleEnumeration));
		Assert.assertTrue(resourceBundleEnumeration.hasMoreElements());
		Assert.assertEquals("key3", resourceBundleEnumeration.nextElement());

		try {
			resourceBundleEnumeration.nextElement();

			Assert.fail();
		}
		catch (NoSuchElementException nsee) {
		}
	}

	@Test
	public void testWithoutEnumeration() throws Exception {
		Set<String> set = new LinkedHashSet<String>(
			Arrays.asList("key1", "key2"));

		ResourceBundleEnumeration resourceBundleEnumeration =
			new ResourceBundleEnumeration(set, null);

		Assert.assertTrue(resourceBundleEnumeration.hasMoreElements());
		Assert.assertEquals("key1", resourceBundleEnumeration.nextElement());

		Method nextElementMethod = ReflectionUtil.getBridgeMethod(
			ResourceBundleEnumeration.class, "nextElement");

		Assert.assertEquals(
			"key2", nextElementMethod.invoke(resourceBundleEnumeration));

		try {
			resourceBundleEnumeration.nextElement();

			Assert.fail();
		}
		catch (NoSuchElementException nsee) {
		}
	}

}