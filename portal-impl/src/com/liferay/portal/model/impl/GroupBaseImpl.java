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

package com.liferay.portal.model.impl;

import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.util.StringBundler;
import com.liferay.portal.kernel.util.StringPool;
import com.liferay.portal.model.Group;
import com.liferay.portal.service.GroupLocalServiceUtil;

import java.util.ArrayList;
import java.util.List;

/**
 * The extended model base implementation for the Group service. Represents a row in the &quot;Group_&quot; database table, with each column mapped to a property of this class.
 *
 * <p>
 * This class exists only as a container for the default extended model level methods generated by ServiceBuilder. Helper methods and all application logic should be put in {@link GroupImpl}.
 * </p>
 *
 * @author Brian Wing Shun Chan
 * @see GroupImpl
 * @see com.liferay.portal.model.Group
 * @generated
 */
public abstract class GroupBaseImpl extends GroupModelImpl implements Group {
	/*
	 * NOTE FOR DEVELOPERS:
	 *
	 * Never modify or reference this class directly. All methods that expect a group model instance should use the {@link Group} interface instead.
	 */
	@Override
	public void persist() {
		if (this.isNew()) {
			GroupLocalServiceUtil.addGroup(this);
		}
		else {
			GroupLocalServiceUtil.updateGroup(this);
		}
	}

	@Override
	@SuppressWarnings("unused")
	public String buildTreePath() throws PortalException {
		List<Group> groups = new ArrayList<Group>();

		Group group = this;

		while (group != null) {
			groups.add(group);

			group = GroupLocalServiceUtil.fetchGroup(group.getParentGroupId());
		}

		StringBundler sb = new StringBundler((groups.size() * 2) + 1);

		sb.append(StringPool.SLASH);

		for (int i = groups.size() - 1; i >= 0; i--) {
			group = groups.get(i);

			sb.append(group.getGroupId());
			sb.append(StringPool.SLASH);
		}

		return sb.toString();
	}

	@Override
	public void updateTreePath(String treePath) {
		Group group = this;

		group.setTreePath(treePath);

		GroupLocalServiceUtil.updateGroup(group);
	}
}